npm init -y

yarn add typescript @types/node ts-node-dev -D
npx tsc --init

--Express
yarn add express
yarn add @types/express -D


--Prisma
yarn add prisma -D
yarn add @prisma/client
npx prisma init

--Configurar Prisma (prisma/schema.prisma)

--Executar as migrations
npx prisma migrate dev

--Executar o Prisma Studio
npx prisma studio


--Nodemailer
yarn add nodemailer
yarn add @types/nodemailer

--Cors
yarn add cors
yarn add @types/cors

--Jest
yarn add jest ts-node @swc/jest @types/jest -D
npx jest --init

√ Would you like to use Jest when running "test" script in "package.json"? ... yes
√ Would you like to use Typescript for the configuration file? ... yes
√ Choose the test environment that will be used for testing » node
√ Do you want Jest to add coverage reports? ... yes
√ Which provider should be used to instrument code for coverage? » v8
√ Automatically clear mock calls, instances, contexts and results before every test? ... yes

npm i -D jest @swc/jest

--Ajustar o arquivo jest.config.ts p/ utilizar o SWF

