import {db} from "../db/db.js";

export const getBrands = async (req, res) => {
    const brands = await db.promise().query("SELECT * FROM brands");
    res.json(brands[0]);
}

export const getBrand = async (req, res) => {
    const brand = await db.promise().query("SELECT * FROM brands WHERE id = ?", [req.params.id]);
    res.json(brand[0]);
}

export const postBrand = async (req, res) => {
    try {
        const { brandName, brandImage } = req.body;
        await db.promise().query("INSERT INTO brands SET ?", {brandName, brandImage});
        res.status(201).json({message: "Brand added successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const deleteBrand = async (req, res) => {
    try {
        await db.promise().query("DELETE FROM brands WHERE id = ?", [req.params.id]);
        res.json({message: "Brand deleted successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const updateBrand = async (req, res) => {
    try {
        const { brandName, brandImage } = req.body;
        await db.promise().query("UPDATE brands SET brandName = ?, brandImage = ? WHERE id = ?", [brandName, brandImage, req.params.id]);
        res.json({message: "Brand updated successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

