import Classroom from "../models/classroomModel.js";
import mongoose from "mongoose";
import getStudentAndTeacher from "../helpers/getStudentAndTeacher.js";

const getAllClassrooms = async (req, res) => {
    const classrooms = await Classroom.find();
    
    const updatedClassrooms = [];

    for (let i = 0; i < classrooms.length; i++) {
        updatedClassrooms.push(await getStudentAndTeacher(classrooms[i]));
    }
    
    res.status(200).json(updatedClassrooms);
}

const getClassroom = async (req, res) => {
    const _id = req.params.id;

    const classroom = await Classroom.findOne({ _id })

    if (!classroom) {
        return res.status(404).json({error: "No such classroom"});
    }

    const updatedClassroom = await getStudentAndTeacher(classroom);

    res.status(200).json(updatedClassroom);
}

const createClassroom = async (req, res) => {
    const body = req.body;
    if (!body.teacher) {
        return res.status(400).json({ error: "A classroom needs a teacher" });
    }

    try {
        const { name, image, teacher, semester, students } = body
        const classroom = await Classroom.create({ name, image, teacher, students , semester });

        res.status(201).json(classroom);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateClassroom = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such classroom' });
    }

    const classroom = await Classroom.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if(!classroom) {
        return res.status(404).json({ error: 'No such classroom' });
    }

    const updatedClassroom = await Classroom.findOne({ _id: id });

    res.status(200).json(updatedClassroom);
}

const deleteClassroom = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such classroom' });
    }

    const classroom = await Classroom.findByIdAndDelete(id);

    if(!classroom) return res.status(404).json({ error: 'No such classroom' });

    res.status(200).json(classroom);
}

const addStudents = async (req, res) => {
    const students = req.body;
    console.log(students);
    const _id = req.params.id; 

    console.log(_id);

    const classroom = await Classroom.findOne({ _id });

    if(!classroom) {
        return res.status(400).json({ error: "No such classroom" });
    }

    students.forEach(student => {
        if (!classroom.students.includes(student)) {
            classroom.students.push(student);
        }
    });

    const updatedStudents = classroom.students;

    console.log(updatedStudents);

    try {
    
        await Classroom.updateOne({ _id }, { students: updatedStudents });
    
        const updatedClassroom = await Classroom.findOne({ _id });
    
        res.status(200).json(updatedClassroom.students);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

export { getClassroom, getAllClassrooms, createClassroom, updateClassroom, deleteClassroom, addStudents }

