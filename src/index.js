import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { router } from "./routes/routes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3030; 

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Running");
});

app.use('/api', router)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => console.log(`Running on port ${port}`));
    })
    .catch(error => console.log(error));