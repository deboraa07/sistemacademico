import mongoose from "mongoose";
import Student from "../models/studentModel.js";

const createStudent = async (req, res) => {
    const { name, registration, email } = req.body;

    try {
        const user = await Student.create(name, registration, email);

        res.status(201).json(user);
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

const updateStudent = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such student' });
    }

    const student = await Student.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if(!student) {
        return res.status(404).json({ error: 'No such student' });
    }

    res.status(200).json(student);
}

const deleteStudent = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such student' });
    }

    const student = await Student.findByIdAndDelete(id);

    if(!student) return res.status(404).json({ error: 'No such student' });

    res.status(200).json(student);
}

export { createStudent, getStudent, getAllStudents, updateStudent, deleteStudent };