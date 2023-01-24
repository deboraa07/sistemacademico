import Admin from '../models/adminModel.js';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
dotenv.config();


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}


const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await Admin.signup(name, email, password);

        const token = createToken(user._id)

        res.status(200).json({ name, email, token });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export { signup };