import express from "express";
import {
    getBrand,
    getBrands,
    postBrand,
    deleteBrand,
    updateBrand
} from "../controllers/brandsController.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBrands);
router.get("/:id", getBrand);
router.post("/", protect, postBrand);
router.delete("/:id", protect, deleteBrand);
router.put("/:id", protect, updateBrand);

export default router;
