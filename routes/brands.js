import express from "express";
import {
  getBrand,
  getBrands,
  postBrand,
  deleteBrand,
} from "../controllers/brands.js";

const router = express.Router();

router.get("/", getBrands);
router.get("/:id", getBrand);
router.post("/", postBrand);
router.delete("/:id", deleteBrand);
export default router;
