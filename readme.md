# Migrations

1. Build with
   yarn build,
   then delete the `export {}` object created on migrations then run
   npx sequelize-cli db:migrate

# Codegen

run the app,
yarn dev
the execute
yarn codegen

NOTE: maybe is needed to delete the src/generated folder.

# Creating new models

- npx sequelize-cli model:generate --name User --attributes id:string
- change the extension file to ts
- update the model inside
