import mongoose, { Schema } from "mongoose";

const classroomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    area: {
        type: String,
        required: true,
    },
    students: {
        type: [String],
        required: true,
    },
    teacher: {
        type: [String],
        required: true,
    },
});

const Classroom = mongoose.model("classrooms", classroomSchema);

export default Classroom;