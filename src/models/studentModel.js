import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    birth: {
        type: String,
        required: true,
    },
    registration: {
        type: String,
        required: true,
        unique: true,
    },
    classrooms: {
        type: [String],
        required: true,
    },
}, { timestamps: true } );

const Student = mongoose.model("students", studentSchema);

export default Student;

