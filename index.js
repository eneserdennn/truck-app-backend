import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import brandsRouter from "./routes/brandsRoute.js";
import modelsRouter from "./routes/modelsRoute.js";
import spareRoutes from "./routes/sparesRoute.js";
import userRoutes from "./routes/usersRoute.js";
import authRoutes from "./routes/auth.js";

import cookieParser from "cookie-parser";
const app = express();


dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://truck.eneserden.com",
    credentials: true
}));


app.use("/api/brands", brandsRouter);
app.use("/api/models", modelsRouter);
app.use("/api/spares", spareRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


app.listen(8800, () => {
    console.log("server is running on port 8800");
});
