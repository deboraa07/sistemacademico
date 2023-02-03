import { baseLocalUrl, localStorageClassroomKey } from "./constants.js";
import { openModal, buildButton, getToken } from "./utils.js";
import { fromBackToFront } from "./translator.js";
import { deleteClassroom as fetchDelete, getClassrooms } from "./requests.js";

const qs = element => document.querySelector(element);
const ce = element => document.createElement(element);

let classrooms = [];
const token = getToken();

const renderClassroomStudents = classroom => {
    const parent = qs(".modal-content");
    parent.innerHTML = "";

    const h2 = ce("h2");
    h2.id = "classroom-name";
    h2.textContent = classroom.name;
    parent.appendChild(h2);

    const div = ce("div");
    div.id = "classroom-students-name";
    parent.appendChild(div);
    
    classroom.students.forEach(student => {
        const p = ce("p");
        p.textContent = student.name;
        div.appendChild(p);
    });

    openModal();
}

const updateClassroom = classroom => {
    localStorage.setItem(localStorageClassroomKey, JSON.stringify(classroom));
    window.location.href = `${baseLocalUrl}front/html/classroom_crud.html`;
}

const deleteClassroom = async (classroom) => {
    try {
        await fetchDelete(classroom, token);
        classrooms = [...classrooms].filter(currentClassrom => currentClassrom !== classroom);

        renderClassrooms();
    } catch (error) {
        window.alert(`Ops, algo deu errado. Por favor, tente novamente em instantes. Informações sobre o erro: ${error.message}`);
    }
}

const renderClassrooms = () => {
    const parent = qs("#classrooms");
    parent.innerHTML = "";

    classrooms.forEach(classroom => {
        const classDiv = ce("div");
        classDiv.classList.add("classroom");

        const image = ce("img");
        image.src = classroom.image;
        image.alt = "Imagem da turma";

        const classInfoDiv = ce("div");
        classInfoDiv.classList.add("classroom-info");

        const infoTextDiv = ce("div");
        const commonInfo = ce("p");
        commonInfo.textContent = `${classroom.name}, ${classroom.semester}º Período`;
        const teacherInfo = ce("p");
        teacherInfo.textContent = `Professor: ${classroom.teacher.name}`;
        infoTextDiv.appendChild(commonInfo);
        infoTextDiv.appendChild(teacherInfo);

        const infoButtonDiv = ce("div");
        const studentsButton = buildButton("classroom-students", "Ver alunos", () => renderClassroomStudents(classroom));
        infoButtonDiv.appendChild(studentsButton);
        if (document.cookie.includes("token=")){
            const updateButton = buildButton("classroom-update", "Alterar dados", () => updateClassroom(classroom));
            const deleteButton = buildButton("delete-classroom", "Deletar turma", () => deleteClassroom(classroom));
            infoButtonDiv.appendChild(updateButton);
            infoButtonDiv.appendChild(deleteButton);
        }

        classInfoDiv.appendChild(infoTextDiv);
        classInfoDiv.appendChild(infoButtonDiv);

        classDiv.appendChild(image);
        classDiv.appendChild(classInfoDiv);
        
        parent.appendChild(classDiv);
    });
}

const loadPage = async () => {
    if (document.cookie.includes("token=")){
        qs(".add-classroom").style.display = "block";
        qs("#see-users").style.display = "block";
    }

    const apiClassrooms = await getClassrooms();
    apiClassrooms.forEach(classroom => {
        const formattedClassroom = fromBackToFront(classroom);
        formattedClassroom.students = classroom.students.map(fromBackToFront);
        formattedClassroom.teacher = fromBackToFront(classroom.teacher);

        classrooms.push(fromBackToFront(formattedClassroom));
    });

    renderClassrooms();
    localStorage.setItem(localStorageClassroomKey, JSON.stringify({}));
}

loadPage();
