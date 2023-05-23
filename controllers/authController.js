import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { db } from "../db/db.js";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    // Check if user exists
    const user = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
    if (user[0].length > 0) {
        res.status(400);
        return res.json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await db.promise().query("INSERT INTO users SET ?", { username, email, password: hashedPassword });
    res.status(201).json({ username, email });

});

export const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    // Check if user exists
    const user = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);
    if (user[0].length === 0) {
        res.status(400);
        return res.json({ message: "User does not exist" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user[0][0].password);
    if (!isMatch) {
        res.status(400);
        return res.json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign({ id: user[0][0].id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.json({
        token,
        user: {
            id: user[0][0].id,
            username: user[0][0].username,
            email: user[0][0].email
        }
    });

});

export const logout = asyncHandler(async (req, res) => {
    res.send("Logout");
});