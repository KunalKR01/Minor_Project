

const mongoose = require("mongoose");

const users = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String },
    email: { type: String, unique: true, required: true },
    authBy: { type: String, enum: ["Google", "email"], required: true },
    avatarUrl: { type: String }
}, { timestamps: true });


const usersModel = mongoose.model("usersModel", users);

module.exports = usersModel