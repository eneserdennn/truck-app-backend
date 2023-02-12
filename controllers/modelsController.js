import { db } from "../db/db.js";
export const getModels = (req, res) => {
  const q = "SELECT * FROM models";

  db.query(q, (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
};
export const getModel = (req, res) => {
  const id = req.params.id;

  const q = "SELECT * FROM models WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data[0]);
  });

};

export const postModel = (req, res) => {
  const truckModelName = req.body.truckModelName;
  const truckModelImage = req.body.truckModelImage;
  const tId = req.body.tId;

  if (!truckModelName) {
    return res.status(400).json({ message: "Truck model name is required." });
  }

  if (!truckModelImage) {
    return res.status(400).json({ message: "Truck model image is required." });
  }

  if (!tId) {
    return res.status(400).json({ message: "Truck brand ID is required." });
  }

  const q = "INSERT INTO models (truckModelName, truckModelImage, tId) VALUES (?, ?, ?)";

  db.query(q, [truckModelName, truckModelImage, tId], (err, data) => {
    if (err) return res.send(err);

    return res.status(201).json({ message: "Truck model added successfully." });
  });
};


export const updateModel = (req, res) => {
  const { id } = req.params;
  const { truckModelName, truckModelImage, tId } = req.body;

  const q = "UPDATE models SET truckModelName = ?, truckModelImage = ?, tId = ? WHERE id = ?";

  db.query(q, [truckModelName, truckModelImage, tId, id], (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json({
      message: "Model updated successfully."
    });
  });
};


export const deleteModel = (req, res) => {
  const id = req.params.id;

  const q = "DELETE FROM models WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json({ message: "Truck model deleted successfully." });
  });
};

