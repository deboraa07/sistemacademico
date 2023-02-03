const hasText = string => string.replaceAll(" ", "").length > 0;

const inputValidationFunctions = () => {
    const addStudent = data => hasText(data.addStudent);

    const confirmPassword = data => hasText(data.confirmPassword) && data.password === data.confirmPassword;

    const email = data => {
        const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/;

        return regex.test(data.email);
    }

    const enrollment = data => hasText(data.enrollment);

    const image = data => data.image.includes("https://") && data.image.includes(".com");

    const name = data => hasText(data.name);
    
    const password = data => {
        if (!hasText(data.password)) return false;

        const characterValidation = {
            upper: false,
            lower: false,
            number: false,
            special: false
        };

        data.password.split("").forEach(character => {
            if (!isNaN(parseInt(character))) characterValidation.number = true;
            else if (character.toUpperCase() === character.toLowerCase()) characterValidation.special = true;
            else if (character === character.toUpperCase()) characterValidation.upper = true;
            else if (character === character.toLowerCase()) characterValidation.lower = true;
        });

        return Object.keys(characterValidation).reduce((bool, key) => bool && characterValidation[key], true);
    };

    const phoneNumber = data => data.phoneNumber.split("").filter(character => !isNaN(parseInt(character))).join("").length === 11;

    const semester = data => data.semester > 0;
    
    const teacher = data => hasText(data.teacher);

    return {
        addStudent,
        confirmPassword,
        email,
        enrollment,
        image,
        name,
        password,
        phoneNumber,
        semester,
        teacher
    };
}

export { inputValidationFunctions };
