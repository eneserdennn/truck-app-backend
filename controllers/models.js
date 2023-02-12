import { db } from "../db/db.js";
export const getModels = (req, res) => {
  const q = "SELECT * FROM models";

  db.query(q, (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
};
export const getModel = (req, res) => {
  res.json(req.params.id);
};
export const postModel = (req, res) => {
  res.json(req.body);
};

export const deleteModel = (req, res) => {
  res.json(req.params.id);
};
