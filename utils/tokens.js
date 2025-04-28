import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function decodeToken(token) {
    console.log("Decoding token with secret:", process.env.TOKEN_SECRET_KEY);  // Debugging log
    return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
}

export function createToken(user_id, username) {
    console.log("Creating token with secret:", process.env.TOKEN_SECRET_KEY);  // Debugging log
    return jwt.sign({ user_id, username }, process.env.TOKEN_SECRET_KEY);
}
