<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Restaurant backend - Nest JS

## Get started
1. Rename ``.env.template`` file and assing the settings values.

2. Install dev dependencies
```bash
yarn
```
3. Instance db and client with prisma
```bash
yarn prisma db push #create the documents in mongoDB

yarn prisma generate client
```
# Run the project in dev env
1. Execute command:
```bash
yarn start:dev
```