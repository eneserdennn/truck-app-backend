import express from "express";
import {
    getBrand,
    getBrands,
    postBrand,
    deleteBrand,
    updateBrand
} from "../controllers/brandsController.js";

const router = express.Router();

router.get("/", getBrands);
router.get("/:id", getBrand);
router.post("/", postBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);
export default router;
