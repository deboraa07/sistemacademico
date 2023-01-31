import { baseLocalUrl, localStorageClassroomKey } from "./constants.js";
import { openModal } from "./utils.js";

const qs = element => document.querySelector(element);
const ce = element => document.createElement(element);

const createButton = (className, text, onClick) => {
    const button = ce("button");
    button.classList.add(className);
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
}

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

const renderClassrooms = classrooms => {
    const parent = qs("#classrooms");

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
        const studentsButton = createButton("classroom-students", "Ver alunos", () => renderClassroomStudents(classroom));
        const updateButton = createButton("classroom-update", "Alterar dados", () => updateClassroom(classroom));
        infoButtonDiv.appendChild(studentsButton);
        infoButtonDiv.appendChild(updateButton);

        classInfoDiv.appendChild(infoTextDiv);
        classInfoDiv.appendChild(infoButtonDiv);

        classDiv.appendChild(image);
        classDiv.appendChild(classInfoDiv);
        
        parent.appendChild(classDiv);
    });
}

const loadPage = () => {
    const classrooms = [
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
    ];
    renderClassrooms(classrooms);
    localStorage.setItem(localStorageClassroomKey, JSON.stringify({}));
}

const request = async () => fetch("https://dog.ceo/api/breeds/image/random").then(response => response.json());
const logRequest = async () => console.log(await request());
logRequest();

loadPage();
