const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Model = Sequelize.Model;

class User extends Model {}

User.init(
  {
    u_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    u_username: { type: Sequelize.STRING },
    u_password: { type: Sequelize.STRING },
    u_email: { type: Sequelize.STRING },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    createdAt: "u_created_at",
    updatedAt: "u_updated_at",
  }
);

module.exports = User;
