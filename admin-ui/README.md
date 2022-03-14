How to run:

1. Add a .npmrc file with the following content (placeholders can be filled in after setting up jforg account)
```sh
registry=https://glue42.jfrog.io/artifactory/api/npm/default-npm-virtual/
_auth = <COPY_FROM_JFROG_SETUP>
email = <COPY_FROM_JFROG_SETUP>
always-auth = true
```

2. Execute 
```sh
npm i
npm run start
```
