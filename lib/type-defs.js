"use strict";
const { gql } = require("@apollo/client/core");

const typeDefs = gql`
  extend type Query {
    restViewer: RestUser!
  }

  type RestUser {
    id: String!
    name: String!
    reposUrl: String!
    repos(page: Int, per_page: Int): [RestRepository!]
  }

  type RestRepository {
    id: String!
    name: String!
  }
`;
exports = module.exports = typeDefs;
