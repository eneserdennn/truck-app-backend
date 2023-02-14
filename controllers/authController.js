import { db } from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    // CHECK IF USER ALREADY EXISTS
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) return res.json("User already exists");

        // HASH PASSWORD AND CREATE USER
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
        const values = [req.body.username, req.body.email, hash];

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User created successfully");
        });
    });
}

export const login = async (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length < 1) return res.json("User not found");

        const user = data[0];

        // COMPARE PASSWORD
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordCorrect) return res.status(401).json({ message: "Wrong password" });

        const token = jwt.sign({ id: user.id }, "jwtkey");
        const { password, ...other } = user;

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({token: token});

    });

}

export const logout = async (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    }).status(200).json({ message: "Logged out" });
}

