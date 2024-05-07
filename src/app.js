require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

const sequelize = require("./utils/database");
const errorHandler = require("./utils/error");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, AuthorizationToken"
  );
  next();
});

app.use("/auth", authRoutes);
app.use("/api", bookRoutes);

app.use((error, request, response, next) => {
  return response.status(250).json(errorHandler.makeErrorResponse(error));
});

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Database sync failed:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
