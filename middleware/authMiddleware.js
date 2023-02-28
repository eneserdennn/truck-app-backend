import jwt from "jsonwebtoken";
import { db } from "../db/db.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await db.promise().query("SELECT * FROM users WHERE id = ?", [decoded.id]);
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({message: "Not authorized, token failed"});
        }
    }

    if (!token) {
        return res.status(401).json({message: "Not authorized, no token"});
    }
}