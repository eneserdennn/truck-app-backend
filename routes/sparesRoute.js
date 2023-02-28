import express from "express";
import { getSpare, getSpares, postSpare, deleteSpare, updateSpare } from "../controllers/sparesController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getSpares);
router.get("/:id", getSpare);
router.post("/", protect, postSpare);
router.delete("/:id", protect, deleteSpare);
router.put("/:id", protect, updateSpare);


export default router;
