import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from 'validator'

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
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
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
}, { timestamps: true } );

studentSchema.statics.signup = async function(firstName, lastName, birth, registration, email, password, course) {

    if(!firstName || !lastName || !birth || !registration || !email || !password || !course) {
        throw Error('All fields must be filled')
    }
    
    if(!validator.isEmail(email)){
        throw Error('Not a valid email')
    }
    
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const emailExists = await this.findOne({email});
    const registrationExists = await this.findOne({registration});

    if(emailExists){
      throw Error('E-mail already in use')
    };

    if(registrationExists){
        throw Error('Registration already in use')
      };
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    const user = await this.create({ firstName, lastName, birth, registration, email, password:hash, course });
  
    return user;
}

const Student = mongoose.model("students", studentSchema);

export default Student;

