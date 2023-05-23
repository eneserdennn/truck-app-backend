import * as dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import brandsRouter from "./routes/brandsRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import modelsRouter from "./routes/modelsRoute.js";
import spareRoutes from "./routes/sparesRoute.js";
import userRoutes from "./routes/usersRoute.js";

const app = express();
app.use(cors({
    origin: ["https://truck.eneserden.com/"],
}));

dotenv.config();

app.use(express.json());
app.use(cookieParser());



app.use("/api/brands", brandsRouter);
app.use("/api/models", modelsRouter);
app.use("/api/spares", spareRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


app.listen(8800, () => {
    console.log("server is running on port 8800");
});
