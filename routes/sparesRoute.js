import express from "express";
import { getSpare, getSpares, postSpare, deleteSpare, updateSpare } from "../controllers/sparesController.js";

const router = express.Router();

router.get("/", getSpares);
router.get("/:id", getSpare);
router.post("/", postSpare);
router.put("/:id", updateSpare);
router.delete("/:id", deleteSpare);

export default router;
