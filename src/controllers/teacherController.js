import Teacher from "../models/teacherModel.js";

const createTeacher = async (req, res) => {
    const { name, registration, email } = req.body;

    try {
        const teacher = await Teacher.create(name, registration, email);

        res.status(201).json(teacher);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getTeacher = async (req, res) => {
    const { registration } = req.params;

    const teacher = await Teacher.find({ registration })

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
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such teacher' });
    }

    const teacher = await Teacher.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if(!teacher) {
        return res.status(404).json({ error: 'No such teacher' });
    }

    res.status(200).json(teacher);
}

const deleteTeacher = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such teacher' });
    }

    const teacher = await Teacher.findByIdAndDelete(id);

    if(!teacher) return res.status(404).json({ error: 'No such teacher' });

    res.status(200).json(teacher);
}

export { createTeacher, getTeacher, getAllTeachers, updateTeacher, deleteTeacher};