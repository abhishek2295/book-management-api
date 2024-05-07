const Book = require("../models/book");

const errorHandler = require("../utils/error");
const apiResponder = require("../utils/responder");

const sequelize = require("sequelize");
const Op = sequelize.Op;

exports.createBook = async (request, response, next) => {
  try {
    errorHandler.validate(["title", "author", "publicationYear"], request.body);

    const { title, author, publicationYear } = request.body;

    const createdBy = request.userId;

    const isBookExist = await Book.findOne({
      where: {
        title,
        author,
      },
    });

    if (isBookExist) {
      throw errorHandler.createError(4003);
    }

    const book = await Book.create({
      title,
      author,
      publicationYear,
      createdBy,
    });

    return apiResponder(request, response, next, true, 2001, book);
  } catch (error) {
    next(error);
  }
};
exports.searchBook = async (request, response, next) => {
  try {
    const { author, publicationyear } = request.params;

    const whereCondition = {};

    if (author) whereCondition.author = { [Op.like]: `%${author}%` };

    if (publicationyear)
      whereCondition.publicationYear = { [Op.like]: `%${publicationyear}%` };

    const books = await Book.findAll({
      attributes: ["title", "author", "publicationYear"],
      where: whereCondition,
    });

    return apiResponder(request, response, next, true, 2001, books);
  } catch (error) {
    next(error);
  }
};
