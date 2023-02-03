import { baseLocalUrl, localStorageClassroomKey } from "./constants.js";
import { getAndValidateForm } from "./forms.js";
import { closeModal, openModal, getToken } from "./utils.js";
import { inputValidationFunctions } from "./validations.js";
import { createClassroom, updateClassroom } from "./requests.js";

const qs = element => document.querySelector(element);
const ce = element => document.createElement(element);

const formData = {
    name: "",
    image: "",
    semester: "",
    teacher: "",
    students: []
};
const parsedClassroom = JSON.parse(localStorage.getItem(localStorageClassroomKey));
const token = getToken();

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
        button.classList.add("remove-button");
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
    if (Object.keys(parsedClassroom).length === 0) return;

    Object.keys(formData).forEach(key => formData[key] = parsedClassroom[key]);
    updateForm();
}

const saveClassroom = async () => {
    const data = getAndValidateForm();

    if (!data) return;

    const request = Object.keys(parsedClassroom).length === 0 ? createClassroom : updateClassroom;

    try {
        await request(data, token);
        window.location.href = `${baseLocalUrl}front/html/classrooms.html`;
    } catch (error) {
        window.alert(`Ops, algo deu errado. Por favor, tente novamente em instantes. Informações sobre o erro: ${error.message}`);
    }
}

const addStudent = () => {
    const studentName = qs("#add-student").name;
    const studentValue = qs("#add-student").value;
    const data = {[studentName]: studentValue}
    const validations = inputValidationFunctions();

    if (!validations[studentName](data)) return;

    try {
        formData.students.push(studentValue);
        formData.students.sort();
        renderStudents();
    } catch (error) {
        window.alert(`Ops, algo deu errado. Por favor, tente novamente em instantes. Informações sobre o erro: ${error}`);
    } finally {
        closeModal();
        qs("#add-student").value = "";
    }
}

qs("#save-button").addEventListener("click", saveClassroom);
qs("#add-students").addEventListener("click", openModal);
qs("#add-student-button").addEventListener("click", addStudent);
getInformation();
