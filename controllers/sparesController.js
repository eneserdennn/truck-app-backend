import {db} from "../db/db.js";

export const getSpares = async (req, res) => {
    const spares = await db.promise().query("SELECT * FROM spares");
    res.json(spares[0]);

}

export const getSpare = async (req, res) => {
    const spare = await db.promise().query("SELECT * FROM spares WHERE id = ?", [req.params.id]);
    res.json(spare[0]);
}

export const postSpare = async (req, res) => {
    try {
        const { sparePartName, sparePartOemNo, sparePartImage, sparePartAlternateNo, stockState, modelId } = req.body;
        const newSpare = await db.promise().query("INSERT INTO spares SET ?", {sparePartName, sparePartOemNo, sparePartImage, sparePartAlternateNo, stockState, modelId});
        res.status(201).json({message: "Spare part added successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});

    }
}

export const deleteSpare = async (req, res) => {
    try {
        const spare = await db.promise().query("DELETE FROM spares WHERE id = ?", [req.params.id]);
        res.json({message: "Spare part deleted successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const updateSpare = async (req, res) => {
    try {
        const { sparePartName, sparePartOemNo, sparePartImage, sparePartAlternateNo, stockState, modelId } = req.body;
        const updatedSpare = await db.promise().query("UPDATE spares SET sparePartName = ?, sparePartOemNo = ?, sparePartImage = ?, sparePartAlternateNo = ?, stockState = ?, modelId = ? WHERE id = ?", [sparePartName, sparePartOemNo, sparePartImage, sparePartAlternateNo, stockState, modelId, req.params.id]);
        res.json({message: "Spare part updated successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}