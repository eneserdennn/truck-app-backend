import express from "express";
import { getModel, getModels } from "../controllers/models.js";

const router = express.Router();

router.get("/", getModels);
router.get("/:id", getModel);
export default router;
