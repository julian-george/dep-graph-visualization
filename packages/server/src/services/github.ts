import { GraphQLClient, gql } from "graphql-request";
import UserAgent from "user-agents";
import { INVALID_URL, SERVER_ERROR } from "errors";

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
              name
              target {
                ... on Commit {
                  history {
                    edges {
                      node {
                        ... on Commit {
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
    console.log(data);
  } catch (e: any) {
    console.error(e);
    throw SERVER_ERROR(e);
  }
};
