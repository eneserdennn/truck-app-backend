import express from "express";
import {getModel, getModels, postModel, deleteModel, updateModel} from "../controllers/modelsController.js";

const router = express.Router();

router.get("/", getModels);
router.get("/:id", getModel);
router.post("/", postModel);
router.put("/:id", updateModel);
router.delete("/:id", deleteModel);
export default router;
