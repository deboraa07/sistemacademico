import Student from "../models/studentModel.js";
import Classroom from "../models/classroomModel.js";

const createStudent = async (req, res) => {
    const { name, registration, email, phoneNumber } = req.body;

    try {
        const user = await Student.create({ name, registration, email, phoneNumber });

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getStudent = async (req, res) => {
    const { registration } = req.params;

    const student = await Student.findOne({ registration })

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
    const { registration } = req.params;

    const student = await Student.findOneAndUpdate({ registration }, {
        ...req.body
    });

    if(!student) {
        return res.status(404).json({ error: 'No such student' });
    }

    const updatedStudent = await Student.findOne({ registration });

    res.status(200).json(updatedStudent);
}

const deleteStudent = async (req, res) => {
    const { registration } = req.params;

    const student = await Student.findOneAndDelete({ registration });

    if(!student) return res.status(404).json({ error: 'No such student' });

    await Classroom.updateMany({ students: registration }, { $pull: { students: registration } });

    res.status(200).json(student);
}

export { createStudent, getStudent, getAllStudents, updateStudent, deleteStudent };