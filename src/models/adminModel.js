import mongoose, { Schema } from 'mongoose';
import bcrypt from "bcrypt";
import validator from 'validator'

const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique:true,
        },
        password:{
            type: String,
            required: true,
        }
    },
    {timestamps:true}
)

adminSchema.statics.signup = async function(name,email,password) {

    if(!name || !email || !password){
        throw Error('All fields must be filled')
      }
    
      if(!validator.isEmail(email)){
        throw Error('Not a valid email')
      }
    
      if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
      }

    const exists = await this.findOne({email});

    if(exists){
      throw Error('E-mail already in use')
    };
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    
    const user = await this.create({name,email,password:hash});
  
    return user;
}

const Admin = mongoose.model("Admin",adminSchema);
export default Admin