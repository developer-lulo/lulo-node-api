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
