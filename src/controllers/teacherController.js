import Teacher from "../models/teacherModel.js";

const teacherSignup = async (req, res) => {
    const { firstName, lastName, birth, registration, email, password, degree } = req.body;

    try {
        const user = await Teacher.signup(firstName, lastName, birth, registration, email, password, degree);

        const token = createToken(user._id)

        res.status(200).json({ name, email, token });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export { teacherSignup };