import express from "express";
import {getModel, getModels, postModel, deleteModel, updateModel} from "../controllers/modelsController.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getModels);
router.get("/:id", getModel);
router.post("/", protect, postModel);
router.delete("/:id", protect, deleteModel);
router.put("/:id",protect, updateModel);
export default router;