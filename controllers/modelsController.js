import {db} from "../db/db.js";

export const getModels = async (req, res) => {
    const models = await db.promise().query("SELECT * FROM models");
    res.json(models[0]);
}

export const getModel = async (req, res) => {
    const model = await db.promise().query("SELECT * FROM models WHERE id = ?", [req.params.id]);
    res.json(model[0]);
}

export const postModel = async (req, res) => {
    try {
        const { truckModelName, truckModelImage, tId } = req.body;
        await db.promise().query("INSERT INTO models SET ?", {truckModelName, truckModelImage, tId});
        res.status(201).json({message: "Model added successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const deleteModel = async (req, res) => {
    try {
        await db.promise().query("DELETE FROM models WHERE id = ?", [req.params.id]);
        res.json({message: "Model deleted successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const updateModel = async (req, res) => {
    try {
        const { truckModelName, truckModelImage, tId } = req.body;
        await db.promise().query("UPDATE models SET truckModelName = ?, truckModelImage = ?, tId = ? WHERE id = ?", [truckModelName, truckModelImage, tId, req.params.id]);
        res.json({message: "Model updated successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}