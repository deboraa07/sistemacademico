import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { studentRouter } from "./routes/studentRouter.js";
import { teacherRouter } from "./routes/teacherRouter.js";
import { classroomRouter } from "./routes/classroomRouter.js";
import { adminRouter } from "./routes/adminRouter.js";
import cors from 'cors'
dotenv.config();

const app = express();
const port = process.env.PORT || 3030; 

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Running");
});

app.use('/api/admin', adminRouter);
app.use('/api/teacher', teacherRouter);
app.use('/api/student', studentRouter);
app.use('/api/classroom', classroomRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => console.log(`Running on port ${port}`));
    })
    .catch(error => console.log(error));