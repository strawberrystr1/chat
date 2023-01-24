import { Sequelize } from "sequelize";

// const dbClient = new Sequelize(
//   'chat',
//   'postgres',
//   'password',
//   {
//     dialect: "postgres",
//     host: 'localhost',
//     port: 5432,
//     logging: false
//   }
// );

const dbClient = new Sequelize(
  "postgresql://postgres:r5360gmMCFzSox5gqpxJ@containers-us-west-103.railway.app:6476/railway",
  {
    logging: false
  }
);

export default dbClient;
