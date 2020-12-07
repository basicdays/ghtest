"use strict";
const { gql } = require("@apollo/client/core");

const getGithubClient = require("./client.js");

/**
 * @typedef {import('@apollo/client/core').ApolloClient} ApolloClient
 */

const VIEWER_QUERY = gql`
  query Viewer($repositoryLimit: Int = 10, $repositoryCursor: String = null) {
    viewer {
      id
      name
      repositories(first: $repositoryLimit, after: $repositoryCursor) {
        edges {
          node {
            id
            name
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

const LEGACY_VIEWER_QUERY = gql`
  query LegacyViewer($repositoryLimit: Int = 10, $repositoryPage: Int = 1) {
    restViewer @rest(type: "RestUser", path: "user") {
      id
      name
      reposUrl @export(as: "reposUrl")
      repos(per_page: $repositoryLimit, page: $repositoryPage)
        @rest(
          type: "[RestRepository]"
          path: "{exportVariables.reposUrl}?{args}"
          endpoint: "nested"
        ) {
        id
        name
      }
    }
  }
`;

const FULL_VIEWER_QUERY = gql`
  query FullViewer(
    $repositoryLimit: Int = 10
    $repositoryCursor: String = null
    $repositoryPage: Int = 1
  ) {
    viewer {
      id
      name
      repositories(first: $repositoryLimit, after: $repositoryCursor) {
        edges {
          node {
            id
            name
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
    restViewer @rest(type: "RestUser", path: "user") {
      id
      name
      reposUrl @export(as: "reposUrl")
      repos(per_page: $repositoryLimit, page: $repositoryPage)
        @rest(
          type: "[RestRepository]"
          path: "{exportVariables.reposUrl}?{args}"
          endpoint: "nested"
        ) {
        id
        name
      }
    }
  }
`;

/**
 * Call GraphQL and Rest in separate queries.
 *
 * @param {ApolloClient} client
 */
async function testCallSeparate(client) {
  const repositoryLimit = 2;

  const result = client.query({
    query: VIEWER_QUERY,
    variables: { repositoryLimit },
  });
  const legacyResult = client.query({
    query: LEGACY_VIEWER_QUERY,
    variables: { repositoryLimit },
  });
  const all = await Promise.all([result, legacyResult]);
  console.dir(all, { depth: 10 });
}

/**
 * Call GraphQL and Rest in same query.
 *
 * Currently fails.
 *
 * @see https://github.com/apollographql/apollo-link-rest/issues/280
 * @param {ApolloClient} client
 */
async function testCallHybrid(client) {
  const repositoryLimit = 2;

  try {
    const result = await client.query({
      query: FULL_VIEWER_QUERY,
      variables: { repositoryLimit },
    });
    console.dir(result, { depth: 10 });
  } catch (err) {
    console.error("Could not call hybrid GraphQL query\n");
    console.error(err);
  }
}

/**
 * @param {string} ghToken
 */
async function main(ghToken) {
  const client = getGithubClient(ghToken);

  // await testCallSeparate(client);
  await testCallHybrid(client);
}
exports = module.exports = main;
