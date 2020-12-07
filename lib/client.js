"use strict";
const {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} = require("@apollo/client/core");
const {
  concatPagination,
  relayStylePagination,
} = require("@apollo/client/utilities");
const { RestLink } = require("apollo-link-rest");
const { fetch } = require("cross-fetch");
const _ = require("lodash");

const typeDefs = require("./type-defs");

/**
 * @param {string} ghToken
 */
function getGithubClient(ghToken) {
  return new ApolloClient({
    name: "github",
    link: from([
      new RestLink({
        // hack: https://github.com/apollographql/apollo-link-rest/issues/192
        endpoints: {
          nested: " ",
        },
        uri: "https://api.github.com/",
        headers: {
          "User-Agent": "alertmd-ghtools",
          Accept: "application/vnd.github.v3.raw+json",
          Authorization: `Token ${ghToken}`,
        },
        fieldNameNormalizer: _.camelCase,
        customFetch: fetch,
      }),
      createHttpLink({
        uri: "https://api.github.com/graphql",
        headers: {
          Authorization: `Bearer ${ghToken}`,
        },
        fetch: fetch,
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        User: {
          fields: {
            repositories: relayStylePagination(),
          },
        },
        RestUser: {
          fields: {
            // assumes fetchMore _always_ moves forward by one page
            repos: concatPagination(),
          },
        },
      },
    }),
    typeDefs,
  });
}
exports = module.exports = getGithubClient;
