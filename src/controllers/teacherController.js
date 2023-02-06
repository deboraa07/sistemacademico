import Teacher from "../models/teacherModel.js";
import Classroom from "../models/classroomModel.js";

const createTeacher = async (req, res) => {
    const { name, registration, email, phoneNumber } = req.body;

    try {
        const teacher = await Teacher.create({ name, registration, email, phoneNumber });

        res.status(201).json(teacher);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getTeacher = async (req, res) => {
    const { registration } = req.params;

    const teacher = await Teacher.findOne({ registration })

    if (!teacher) {
        return res.status(404).json({error: "No such teacher"});
    }

    res.status(200).json(teacher);
}

const getAllTeachers = async (req, res) => {
    const teachers = await Teacher.find();

    res.status(200).json(teachers);
}

const updateTeacher = async (req, res) => {
    const { registration } = req.params;

    const teacher = await Teacher.findOneAndUpdate({ registration }, {
        ...req.body
    });

    if(!teacher) {
        return res.status(404).json({ error: 'No such teacher' });
    }

    const updatedTeacher = await Teacher.findOne({ registration });

    res.status(200).json(updatedTeacher);
}

const deleteTeacher = async (req, res) => {
    const { registration } = req.params;

    const teacher = await Teacher.findOneAndDelete({ registration });

    if(!teacher) return res.status(404).json({ error: 'No such teacher' });

    await Classroom.deleteMany({ teacher: registration });

    res.status(200).json(teacher);
}

export { createTeacher, getTeacher, getAllTeachers, updateTeacher, deleteTeacher};