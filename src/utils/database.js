const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    timezone: "+05:30",
    pool: {
      max: 50,
      min: 0,
      idle: 10000,
      acquire: 60000,
    },
  }
);

module.exports = sequelize;
