import { db } from "../db/db.js";
export const getBrands = (req, res) => {
  const q = "SELECT * FROM brands";

  db.query(q, (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
};
export const getBrand = (req, res) => {
  res.json(req.params.id);
};
export const postBrand = (req, res) => {
  res.json(req.body);
};

export const deleteBrand = (req, res) => {
  res.json(req.params.id);
};
