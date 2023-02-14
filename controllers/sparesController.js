import {db} from "../db/db.js";

export const getSpares = (req, res) => {
    const q = "SELECT * FROM spares";

    db.query(q, (err, data) => {
        if (err) return res.send({error: "Error fetching spares data"});

        return res.status(200).json(data);
    });
};

export const getSpare = (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM spares WHERE id = ?";

    db.query(q, [id], (err, data) => {
        if (err) return res.send({error: "Error fetching spare data"});

        return res.status(200).json(data[0]);
    });
};

export const postSpare = (req, res) => {
    const {sparePartName, sparePartOemNo, sparePartImage, sparePartAlternateNo, stockState, modelId} = req.body;

    if (!sparePartName || !sparePartOemNo || !sparePartImage || !modelId) {
        return res.status(400).send({error: "Spare part name, oem no, image and model id are required"});
    }

    const q = "INSERT INTO spares (sparePartName, sparePartOemNo, sparePartImage, sparePartAlternateNo, stockState, modelId) VALUES (?, ?, ?, ?, ?, ?)";

    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    } else {
        if (!sparePartName) {
            return res.status(400).json({message: "Spare part name is required."});
        }
        if (!sparePartOemNo) {
            return res.status(400).json({message: "Spare part oem no is required."});
        }
        if (!sparePartImage) {
            return res.status(400).json({message: "Spare part image is required."});
        }
        if (!modelId) {
            return res.status(400).json({message: "Model ID is required."});
        }

        db.query(
            q,
            [sparePartName, sparePartOemNo, sparePartImage, sparePartAlternateNo || "", stockState || "", modelId],
            (err, data) => {
                if (err) return res.send({error: "Error inserting spare part data"});

                return res.status(201).send({message: "Spare part added successfully"});
            }
        );
    }
};

export const updateSpare = (req, res) => {
    const {id} = req.params;
    const {sparePartName, sparePartOemNo, sparePartImage, sparePartAlternateNo, stockState, modelId} = req.body;

    const q = "UPDATE spares SET sparePartName = ?, sparePartOemNo = ?, sparePartImage = ?, sparePartAlternateNo = ?, stockState = ?, modelId = ? WHERE id = ?";

    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    } else {
        if (!sparePartName) {
            return res.status(400).json({message: "Spare part name is required."});
        }
        if (!sparePartOemNo) {
            return res.status(400).json({message: "Spare part oem no is required."});
        }
        if (!sparePartImage) {
            return res.status(400).json({message: "Spare part image is required."});
        }
        if (!modelId) {
            return res.status(400).json({message: "Model ID is required."});
        }

        db.query(q, [sparePartName, sparePartOemNo, sparePartImage, sparePartAlternateNo, stockState, modelId, id], (err, data) => {
            if (err) return res.send(err);

            return res.status(200).json({
                message: "Spare part updated successfully."
            });
        });
    }
};

export const deleteSpare = (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM spares WHERE id = ?";

    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    } else {
        db.query(q, [id], (err, data) => {
            if (err) return res.send(err);

            return res.status(200).send({message: "Spare part deleted successfully"});
        });
    }
};
