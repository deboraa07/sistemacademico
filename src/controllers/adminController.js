import Admin from '../models/adminModel.js';

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await Admin.signup(name, email, password);
        res.status(200).json({ name, email, user });
    } catch (error) {
        res.status(400).json(error);
    }
}

export { signup };