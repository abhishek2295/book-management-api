const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/isAuth");

const bookController = require("../controllers/booksController");

router.post("/add-book", authenticateToken, bookController.createBook);

router.get(
  "/search-book/:author/:publicationyear",
  authenticateToken,
  bookController.searchBook
);

module.exports = router;
