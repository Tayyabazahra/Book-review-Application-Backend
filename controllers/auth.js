
import User from "../models/user.js";
import { hashPassword, compare_hashed_passwords } from "../utils/hashing.js";
import { createToken } from "../utils/tokens.js"

export async function register(req, res) {
    try {
        const { username, password } = req.body;
        const foundUser = await User.findOne({ username });
        if (foundUser) {
            return res.json({ message: "This user is already registered!" });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ username: username, password: hashedPassword });
        res.json({ message: "User registered successfully!" });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Internal Server Error!!" });
    }
}

export async function login(req, res) {
    try {

        const { username, password } = req.body;

        const registeredUser = await User.findOne({ username });
        if (!registeredUser) {
            return res.json({ message: "Invalid Credentials!" });
        }
        const is_matched = await compare_hashed_passwords(password, registeredUser.password);
        if (!is_matched) {
            return res.json({ message: "Invalid Credentials!" });
        }
        const token = createToken(registeredUser.id, username);
        return res.json({ message: "User logged in successfully!", token });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Internal Server Error!!" });

    }
}