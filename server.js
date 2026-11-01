import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "./src/database.js";
import usersRouter from "./routes/users.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);

app.get("/api/status", (req, res) => {
    res.json({
        status: "success",
        message: "Node.js server is working!"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});
