#!/usr/bin/env node
"use strict";
const dotenv = require("dotenv");

require("../lib/polyfill");
const ghtest = require("../lib/index.js");

async function main() {
  dotenv.config();
  await ghtest(process.env.GH_TOKEN);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
