# graphql-node-api

## development

- To watch files run `gulp`
  - If command failed, execute `tsc` in project root. Typescript generates dist/ folder or you can create `/dist` manual
- To development or run local, execute after starts gulp: `npm run dev`

If prefer, in Linux or MacOS you can change `package.json` script tag `dev` from:

`"dev": "set NODE_ENV=development&&nodemon --delay 2 dist/index.js"`

to 

`"dev": "NODE_ENV=development&&nodemon --delay 2 dist/index.js"`