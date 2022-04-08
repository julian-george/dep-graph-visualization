import { GraphQLClient, gql } from "graphql-request";
import UserAgent from "user-agents";
import { INVALID_URL, SERVER_ERROR, REPOSITORY_NOT_FOUND } from "errors";
import dotenv from "dotenv";
import { GraphData } from "@dep-graph-visualization/shared";
import { GithubCommit, GithubData, GithubRef } from "./types";

dotenv.config();

const endpoint = "https://api.github.com/graphql";
const MAX_LABEL_LENGTH = 36;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "User-Agent": new UserAgent().toString(),
    authorization: "token " + process.env.PERSONAL_TOKEN,
  },
});

/**
 * This query gets the 100 most recent head refs (most recent commit for each branch),
 * then uses that ref's 'history' attribute to get all of that commits leading to that head.
 * What results is essentially a list of branches, with each branch represented as a list of all of its commits.
 * We also fetch the associatedPullRequests with the mergeCommit field to find where and when that branch was merged.
 * Only the head and a few most recent commits will have an associatedPullRequests,
 * so we check that field at the head to link it to the master branch
 */

const query = (owner: string, name: string) => gql`{
    repository(owner: "${owner}", name: "${name}") {
        refs(refPrefix: "refs/heads/", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 100) {
            edges {
              node {
                ... on Ref {
                  target {
                    ... on Commit {
                      history {
                        edges {
                          node {
                            ... on Commit {
                              parents(first:3) {
                                edges{
                                  node {
                                    oid
                                  }
                                }
                              }
                              author {
                                email
                                name
                              }
                              oid
                              message
                              committedDate
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
  }`;

const parseUrl = (url: string) => {
  const splitUrl = url.split("/");
  if (splitUrl.length !== 2) {
    throw INVALID_URL;
  }
  return splitUrl;
};

export const getCommits = async (url: string) => {
  const [owner, name] = parseUrl(url);
  try {
    const data = await graphQLClient.request(query(owner, name));
    return processCommits(data);
  } catch (e: any) {
    const msg = e.message;
    console.error(e);
    //TODO: fix imperfect error detection
    if (msg.includes('[{"type":"NOT_FOUND",'))
      throw REPOSITORY_NOT_FOUND(owner, name);
    throw SERVER_ERROR(e);
  }
};

const processCommits = (gqlData: GithubData) => {
  const parsedGraphData: GraphData = [];
  const headRefs: GithubRef[] = gqlData.repository.refs.edges;
  const mainCommits: GithubCommit[] = headRefs[0].node.target.history.edges.map(
    (connection) => connection.node
  );
  for (let i = 0; i < mainCommits.length; i++) {
    const commit = mainCommits[i];
    // Pushing the commit node to the graph data
    parsedGraphData.push({
      data: {
        id: commit.oid,
        label:
          commit.message.length > MAX_LABEL_LENGTH
            ? commit.message.substring(0, MAX_LABEL_LENGTH) + "..."
            : commit.message,
      },
    });
    // Pushing the edges from the commit node to its parents
    const parents = commit.parents.edges.map((connection) => connection.node);
    for (const parent of parents) {
      parsedGraphData.push({
        data: { source: commit.oid, target: parent.oid, label: "Parent" },
      });
    }
  }
  return parsedGraphData;
};
