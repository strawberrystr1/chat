import { Sequelize } from "sequelize";

const dbClient = new Sequelize(
  'chat',
  'postgres',
  'password',
  {
    dialect: "postgres",
    host: 'localhost',
    port: 5432,
    logging: false
  }
);

export default dbClient;
