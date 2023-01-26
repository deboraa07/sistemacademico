import mongoose from "mongoose";
import Student from "../models/studentModel.js";

const studentSignup = async (req, res) => {
    const { name, registration, email, password } = req.body;

    try {
        const user = await Student.signup(name, registration, email, password);

        const token = createToken(user._id)

        res.status(200).json({ name, email, token });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getStudent = async (req, res) => {
    const { registration } = req.params;

    const student = await Student.find({ registration })

    if (!student) {
        return res.status(404).json({error: "No such student"});
    }

    res.status(200).json(student);
}

const getAllStudents = async (req, res) => {
    const students = await Student.find();

    res.status(200).json(students);
}

export { studentSignup, getStudent, getAllStudents };