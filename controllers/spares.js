import { db } from "../db/db.js";
export const getSpares = (req, res) => {
  const q = "SELECT * FROM spares";

  db.query(q, (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
};
export const getSpare = (req, res) => {
  res.json(req.params.id);
};
export const postSpare = (req, res) => {
  res.json(req.body);
};

export const deleteSpare = (req, res) => {
  res.json(req.params.id);
};
