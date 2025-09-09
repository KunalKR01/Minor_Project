
// libraries
const bcrypt = require("bcrypt");

//files
const usersModel = require("../models/UserModel");

// storeUser
async function storeUserByEmail(body) {
    const { username, password, email } = body;

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersModel.create({
        username: username,
        password: hashedPassword,
        email: email,
        authBy: "email",
    });
}

// checkUser exists for login
async function isUserExists(body) {
    const { email, password } = body;
    const isUserFound = await usersModel.findOne({
        email: email
    });

    if (isUserFound) {
        const checkPassword = await bcrypt.compare(password, isUserFound.password);
        if (!checkPassword) {
            const error = new Error("Password Invalid");
            error.type = "Password";
            throw error;
        }
        else {
            return isUserFound.id; // if user exists sends the _id as string for jwt token
        }
    }
    else {
        const error = new Error("User not found");
        error.type = "Email";
        throw error;
    }
}


module.exports = { storeUserByEmail, isUserExists };