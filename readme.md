# Migrations

- npx sequelize-cli migration:generate --name {name}
- the file will be created on dist/migrations, move it to src/migrations and update .js to .ts
- run migrations usign `yarn migrations` 
# Codegen

- comment the getMe function when creating graphql context to avoid the auth validation
- run the app, yarn dev
- yarn codegen
- replace the file content `src/generated/gql-types.ts` with the new generated content of `src/generated/gql-types-new.ts`
- dont forget to rollback the getMe function


NOTE: maybe is needed to delete the src/generated folder.

# Creating new models

- npx sequelize-cli model:generate --name User --attributes id:string
- change the extension file to ts
- update the model inside


# Using scripts from package.json 

- dev: compile and run as production just to dev locally
- build: compile the code, used to build the final package to prod
- build:to:bundle: creates a bundle from the app, excluding  the node_modules, so in the end you need to provide the needed packages to run correctly in the node runtime
- build:to:zip: copy the package.json to the dist folder and creates a zip with it content, to be uploaded on Elastic Beanstalk 


# Running on Production 

to start the service using PM2 by running a package.json script 
```
pm2 start npm --name "lulo-node-api" -- start
```