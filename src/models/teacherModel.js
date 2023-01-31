import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from 'validator'

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    registration: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Teacher = mongoose.model("teachers", teacherSchema);

export default Teacher;