import { baseLocalUrl, localStorageClassroomKey } from "./constants.js";
import { getAndValidateForm } from "./forms.js";
import { closeModal, openModal } from "./utils.js";
import { inputValidationFunctions } from "./validations.js";

const qs = element => document.querySelector(element);
const ce = element => document.createElement(element);

const formData = {
    name: "",
    image: "",
    semester: "",
    teacher: "",
    students: []
};

const renderStudents = () => {
    const parent = qs("#students-names");
    parent.innerHTML = "";

    formData.students.forEach(student => {
        const div = ce("div");
        div.classList.add("students-flex");
        div.classList.add("student-name");

        const p = ce("p");
        p.textContent = student;

        const button = ce("button");
        button.textContent = "x";
        button.classList.add("remove-student");
        button.addEventListener("click", () => {
            formData.students = formData.students.filter(formStudent => formStudent !== student);
            renderStudents();
        });

        div.appendChild(p);
        div.appendChild(button);
        parent.appendChild(div);
    });
}

const updateForm = () => {
    Object.keys(formData)
        .filter(key => key !== "students")
        .forEach(key => qs(`#${key}`).value = formData[key]);
    
    renderStudents();
}

const getInformation = () => {
    const classroom = JSON.parse(localStorage.getItem(localStorageClassroomKey));

    if (Object.keys(classroom).length === 0) return;

    formData.name = classroom.name;
    formData.image = classroom.image;
    formData.semester = classroom.semester;
    formData.teacher = classroom.teacher;
    formData.students = classroom.students;

    updateForm();
}

const saveClassroom = async () => {
    const data = getAndValidateForm();

    if (!data) return;

    window.location.href = `${baseLocalUrl}front/html/classrooms.html`;
}

const addStudent = () => {
    const studentName = qs("#add-student").name;
    const studentValue = qs("#add-student").value;
    const data = {[studentName]: studentValue}
    const validations = inputValidationFunctions();

    if (validations[studentName](data)){
        formData.students.push(studentValue);
        formData.students.sort();
        renderStudents();
    }

    qs("#add-student").value = "";
    closeModal();
}

qs("#save-button").addEventListener("click", saveClassroom);
qs("#add-students").addEventListener("click", openModal);
qs("#add-student-button").addEventListener("click", addStudent);
getInformation();
