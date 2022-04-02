import { GraphQLClient, gql } from "graphql-request";
import UserAgent from "user-agents";
import { INVALID_URL, SERVER_ERROR, REPOSITORY_NOT_FOUND } from "errors";
import dotenv from "dotenv";

dotenv.config();

const endpoint = "https://api.github.com/graphql";

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
                              author {
                                email
                                name
                              }
                              oid
                              message
                              committedDate
                              associatedPullRequests(first:1) {
                                edges {
                                  node {
                                    mergeCommit {
                                      id
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
              }
            }
          }
        }
  }`;

const parseUrl = (url: string) => {
  url = url.replace("http://", "");
  url = url.replace("https://", "");
  url = url.replace("github.com/", "");
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
    //TODO: process this to make it suitable for graph on frontend
    return data;
  } catch (e: any) {
    const msg = e.message;
    console.error(e);
    if (msg.includes('[{"type":"NOT_FOUND",'))
      throw REPOSITORY_NOT_FOUND(owner, name);
    throw SERVER_ERROR(e);
  }
};
