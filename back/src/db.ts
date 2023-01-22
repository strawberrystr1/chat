import { Sequelize } from "sequelize";

const dbClient = new Sequelize(
  process.env.PGDATABASE as string,
  process.env.USER as string,
  process.env.PASSWORD as string,
  {
    dialect: "postgres",
    host: process.env.DATABASE_URL as string,
    port: +(process.env.PGPORT as string),
    logging: false
  }
);

export default dbClient;
