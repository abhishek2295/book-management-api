const router = require("express").Router();

const authController = require("../controllers/authController");

router.post("/create-user", authController.createNewUser);
router.post("/verify-credential", authController.verifyAuth);

module.exports = router;
