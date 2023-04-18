import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db} from "../db/db.js";

// @desc Register new user
// @route POST /api/auth/register
// @access Public


// const users = await db.promise().query("SELECT * FROM users");
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    // Check if user exists
    const user = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
    if (user[0].length > 0) {
        res.status(400);
        return res.json({message: "User already exists"});
    }


    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await db.promise().query("INSERT INTO users SET ?", {username, email, password: hashedPassword});
    res.status(201).json({username, email});

}

// @desc Login user
// @route POST /api/auth/login
// @access Public

// @desc Login user
// @route POST /api/auth/login
// @access Public

export const login = async (req, res) => {
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

    // Create and assign token
    const generateToken = (user) => {
        const token = jwt.sign({ id: user[0][0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return token;
    }

    const token = generateToken(user);

    // Set headers and cookie
    res.header("Access-Control-Allow-Origin", "https://truck.eneserden.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.cookie("token", token, { httpOnly: true, secure: true });


    res.status(200).json({ token });
};



// @desc Logout user
// @route POST /api/auth/logout
// @access Private

export const logout = async (req, res) => {
    res.json({message: "Logout User"});
}