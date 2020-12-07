# Github API Test

You will need a Github API key that at least has read-only privs.

To run:

```bash
npm run setup
npm install
npm start
```

## Outstanding Apollo Issues

- Workaround required to call absolute URL endpoints
  - https://github.com/apollographql/apollo-link-rest/issues/192
- Requires global polyfills in Node
  - https://github.com/apollographql/apollo-link-rest/issues/279
- Hybrid GraphQL and Rest calls in one query
  - https://github.com/apollographql/apollo-link-rest/issues/280
- VSCode @rest support (still errors with workaround)
  - https://github.com/apollographql/apollo-tooling/issues/2180
  - https://github.com/apollographql/apollo-link-rest/pull/228
