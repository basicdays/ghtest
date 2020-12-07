"use strict";
const { Headers } = require("cross-fetch");

// hack: https://github.com/apollographql/apollo-link-rest/issues/279
if (global.Headers == null) {
  global.Headers = Headers;
}
