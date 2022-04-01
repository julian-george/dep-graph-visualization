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
