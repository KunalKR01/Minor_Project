

//libraries
const express = require("express");

// middlewares
const authMiddlewares = require("../middlewares/authMiddleware");

//controllers
const authControllers = require("../controllers/authController");


const auth = express.Router();


auth.post("/email/register", authMiddlewares.zodSign, authControllers.register)


auth.post("/signin", authMiddlewares.zodSign, authControllers.signin)


auth.post("/check-token", authMiddlewares.tokenValidation, authControllers.respondTokenExists)



module.exports = auth;