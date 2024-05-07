const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Model = Sequelize.Model;

class Book extends Model {}

Book.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    publicationYear: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    publicationYear: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    createdBy: { type: Sequelize.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Book",
    tableName: "books",
    timestamps: false,
  }
);

module.exports = Book;
