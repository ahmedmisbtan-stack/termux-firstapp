import { Router } from "express";
import { db } from "../src/database.js";

const router = Router();

router.get("/", (req, res) => {
    const users = db.prepare(
        "SELECT * FROM users ORDER BY id DESC"
    ).all();

    res.json(users);
});

router.post("/", (req, res) => {
    const { name } = req.body;

    if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            error: "Name is required"
        });
    }

    const result = db.prepare(
        "INSERT INTO users (name) VALUES (?)"
    ).run(name.trim());

    res.status(201).json({
        id: Number(result.lastInsertRowid),
        name: name.trim(),
        message: "User created successfully"
    });
});

export default router;
