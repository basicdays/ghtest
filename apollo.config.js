"use strict";
const dotenv = require("dotenv");

// see: https://github.com/apollographql/apollo-link-rest/pull/228
const apolloRestSchema = require.resolve("apollo-link-rest/schema.graphql");

dotenv.config({ path: `${__dirname}/.env` });

exports = module.exports = {
  client: {
    includes: [apolloRestSchema, "./lib/**/*.js"],
    service: {
      name: "github",
      url: "https://api.github.com/graphql",
      headers: {
        authorization: `Bearer ${process.env.GH_TOKEN}`,
      },
    },
  },
};
