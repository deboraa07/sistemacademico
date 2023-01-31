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
    
    const password = data => hasText(data.password);

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
        semester,
        teacher,
    };
}

export { inputValidationFunctions };
