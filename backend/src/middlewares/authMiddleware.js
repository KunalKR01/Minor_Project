

// utils
const { decodeToken } = require("../utils/jwt");
const { validateWithZod, handleZod } = require("../utils/validator");

// zodSchema
const signSchema = require("../validators/authValidation");


// token validation 
function tokenValidation(req, res, next) {  //need to use this middlware for every req after the user login

    const token = req.headers.token; //will change for the cookie later
    if (!token) {
        res.json({ message: "No token exists" });
    }
    else {
        // decode token and check is tokenValid
        try {
            const decodedToken = decodeToken(token);
            req.userId = decodedToken.userId;
            next();
        } catch (error) {
            console.log("error in isTokenExistsAndValid- " + error);
            return res.json({ error: error });
        }
    }
}

function zodSign(req, res, next) {

    const result = validateWithZod(signSchema, req.body);
    return handleZod(res, result, next);
}

module.exports = { tokenValidation, zodSign };