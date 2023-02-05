import { baseLocalUrl, localStorageClassroomKey } from "./constants.js";
import { getAndValidateForm } from "./forms.js";
import { closeModal, openModal, getToken, checkAuthorization, buildDefaultOption, buildOption } from "./utils.js";
import { inputValidationFunctions } from "./validations.js";
import { createClassroom, getStudent, getStudents, getTeachers, updateClassroom } from "./requests.js";
import { fromBackToFront } from "./translator.js";

const qs = element => document.querySelector(element);
const ce = element => document.createElement(element);

const formData = {
    name: "",
    image: "",
    semester: "",
    teacher: "",
    students: []
};
const students = [];
const parsedClassroom = JSON.parse(localStorage.getItem(localStorageClassroomKey));
const token = getToken();

const renderStudents = () => {
    const parent = qs("#see-students-names");
    parent.innerHTML = "";

    formData.students.forEach(student => {
        const div = ce("div");
        div.classList.add("see-students-flex");
        div.classList.add("student-name");

        const p = ce("p");
        p.textContent = student.name;

        const button = ce("button");
        button.textContent = "x";
        button.classList.add("delete-button");
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
        .filter(key => !["students", "teacher"].includes(key))
        .forEach(key => qs(`#${key}`).value = formData[key]);
    
        renderStudents();
}

const getInformation = () => {
    if (Object.keys(parsedClassroom).length === 0) return;

    Object.keys(formData).forEach(key => formData[key] = parsedClassroom[key]);
    formData.teacher = parsedClassroom.teacher.enrollment;
    updateForm();
}

const setTeachers = async () => {
    const parent = qs("#teacher");
    parent.innerHTML = "";

    if (!formData.teacher) parent.appendChild(buildDefaultOption("Selecione um professor"));
    
    try {
        const options = await getTeachers().then(response => response.map(teacher => fromBackToFront(teacher)));

        options.forEach(option => {
            const isSelected = option.enrollment === formData.teacher;
            parent.appendChild(buildOption(option.name, option.enrollment, isSelected));
        });
    } catch (error) {
        window.alert(`Ops, algo deu errado. Por favor, tente novamente em instantes. Informações sobre o erro: ${error.message}`);
    }
}

const setStudents = async () => {
    const parent = qs("#students");
    parent.innerHTML = "";
    parent.appendChild(buildDefaultOption("Selecione um aluno"));

    try {
        if (students.length === 0){
            const options = await getStudents().then(response => response.map(student => fromBackToFront(student)));
            options.forEach(option => students.push(option));
            students.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        students
            .filter(student => !formData.students.map(formDataStudent => formDataStudent.enrollment).includes(student.enrollment))
            .forEach(student => parent.appendChild(buildOption(student.name, student.enrollment, false)));
        
        openModal();
    } catch (error) {
        window.alert(`Ops, algo deu errado. Por favor, tente novamente em instantes. Informações sobre o erro: ${error.message}`);
    }
}

const saveClassroom = async () => {
    const data = getAndValidateForm();

    if (!data) return;
    if (!!parsedClassroom.id) data.id = parsedClassroom.id;
    
    data.students = [...formData.students].map(student => student.enrollment);

    const request = Object.keys(parsedClassroom).length === 0 ? createClassroom : updateClassroom;

    try {
        await request(data, token);
        window.location.href = `${baseLocalUrl}front/html/classrooms.html`;
    } catch (error) {
        window.alert(`Ops, algo deu errado. Por favor, tente novamente em instantes. Informações sobre o erro: ${error.message}`);
    }
}

const addStudent = async () => {
    const selectedStudent = Array.from(qs("select[name=students]").options).find(option => option.selected === true).value;

    if (!inputValidationFunctions().addStudent({addStudent: selectedStudent})) return;

    try {
        formData.students.push(students.find(student => student.enrollment === selectedStudent));
        formData.students.sort((a, b) => a.name.localeCompare(b.name));
        renderStudents();
    } catch (error) {
        window.alert(`Ops, algo deu errado. Por favor, tente novamente em instantes. Informações sobre o erro: ${error}`);
    } finally {
        closeModal();
    }
}

checkAuthorization();
qs("#save-button").addEventListener("click", saveClassroom);
qs("#add-students").addEventListener("click", setStudents);
qs("#add-student-button").addEventListener("click", addStudent);
getInformation();
setTeachers();
