
const dotenv = require("dotenv");

dotenv.config();

const config = {
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  synchronize: false,
  logging: false,
  migrationsTableName: "migration_table",
  migrations: ["src/Migrations/*.ts", "Migrations/*.js"],
  cli: {
    migrationsDir: "src/Migrations",
    entitiesDir: "dist/application/core/data/entities",
  },
};

module.exports = config;