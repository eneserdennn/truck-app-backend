import { db } from "../db/db.js";
export const getBrands = (req, res) => {
  const q = "SELECT * FROM brands";

  db.query(q, (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
};
export const getBrand = (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM brands WHERE id = ?";

    db.query(q, [id], (err, data) => {
        if (err) return res.send(err);

        return res.status(200).json(data[0]);
    });
};

export const postBrand = (req, res) => {
    const brandImage = req.body.brandImage;
    const brandName = req.body.brandName;

    if (!brandImage) {
        return res.status(400).json({ message: "Brand image is required." });
    }

    if (!brandName) {
        return res.status(400).json({ message: "Brand name is required." });
    }


    const q = "INSERT INTO brands (brandImage, brandName) VALUES (?, ?)";

    db.query(q, [brandImage, brandName], (err, data) => {
        if (err) return res.send(err);

        return res.status(201).json({ message: "Brand added successfully." });
    });
};

export const updateBrand = (req, res) => {
    const { id } = req.params;
    const { brandImage, brandName } = req.body;

    const q = "UPDATE brands SET brandImage = ?, brandName = ? WHERE id = ?";

    db.query(q, [brandImage, brandName, id], (err, data) => {
        if (err) return res.send(err);

        return res.status(200).json({
            message: "Brand updated successfully."
        });
    });
};


export const deleteBrand = (req, res) => {
    const id = req.params.id;

    const q = "DELETE FROM brands WHERE id = ?";

    db.query(q, [id], (err, data) => {
        if (err) return res.send(err);

        return res.status(200).json({ message: "Brand deleted successfully." });
    });
};


