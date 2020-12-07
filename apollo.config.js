"use strict";
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/.env` });

exports = module.exports = {
  client: {
    includes: [
      "./node_modules/apollo-link-rest/schema.graphql",
      "./lib/**/*.js",
    ],
    service: {
      name: "github",
      url: "https://api.github.com/graphql",
      headers: {
        authorization: `Bearer ${process.env.GH_TOKEN}`,
      },
    },
  },
};
