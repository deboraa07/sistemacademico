import Student from "../models/studentModel";

const studentSignup = async (req, res) => {
    const { firstName, lastName, birth, registration, email, password, course } = req.body;

    try {
        const user = await Student.signup(firstName, lastName, birth, registration, email, password, course);

        const token = createToken(user._id)

        res.status(200).json({ name, email, token });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export { studentSignup };