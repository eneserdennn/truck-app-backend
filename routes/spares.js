import express from "express";
import { getSpare, getSpares } from "../controllers/spares.js";

const router = express.Router();

router.get("/", getSpares);
router.get("/:id", getSpare);

export default router;
