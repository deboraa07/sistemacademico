import { baseLocalUrl, localStorageClassroomKey } from "./constants.js";
import { openModal, buildButton } from "./utils.js";
import { fromBackToFront } from "./translator.js";
import { deleteClassroom as fetchDelete } from "./requests.js";

const qs = element => document.querySelector(element);
const ce = element => document.createElement(element);

let classrooms = [];

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
        p.textContent = student;
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
        // await fetchDelete(classroom);
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
        teacherInfo.textContent = `Professor: ${classroom.teacher}`;
        infoTextDiv.appendChild(commonInfo);
        infoTextDiv.appendChild(teacherInfo);

        const infoButtonDiv = ce("div");
        if (document.cookie.includes("token=")){
            const studentsButton = buildButton("classroom-students", "Ver alunos", () => renderClassroomStudents(classroom));
            const updateButton = buildButton("classroom-update", "Alterar dados", () => updateClassroom(classroom));
            const deleteButton = buildButton("delete-classroom", "Deletar turma", () => deleteClassroom(classroom));
            infoButtonDiv.appendChild(studentsButton);
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

const loadPage = () => {
    const apiClassrooms = [
        {
            image: "https://ciclovivo.com.br/wp-content/uploads/2018/10/iStock-536613027-1024x683.jpg",
            name: "Programação Web 1",
            semester: 4,
            teacher: "Severo Snape",
            students: ["Artur", "Caio", "Débora", "Immanuel"]
        },
        {
            image: "https://storage.googleapis.com/dpw/app/uploads/2019/04/lazy-loading-nativo-imagens-iframes_.jpg",
            name: "Testes de Software",
            semester: 4,
            teacher: "Diogo Moreira",
            students: ["Artur", "Caio", "Débora", "Immanuel"]
        }
    ].map(classroom => fromBackToFront(classroom));
    apiClassrooms.forEach(classroom => classrooms.push(classroom));

    renderClassrooms();
    localStorage.setItem(localStorageClassroomKey, JSON.stringify({}));
}

loadPage();
