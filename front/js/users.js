import { baseLocalUrl, localStorageUserKey } from "./constants.js";
import { deleteStudent, deleteTeacher, getTeachers } from "./requests.js";
import { fromBackToFront } from "./translator.js";
import { buildButton } from "./utils.js";

const qs = element => document.querySelector(element);
const ce = element => document.createElement(element);

const usersData = [];

const deleteUser = async (user) => {
    try {
        const deleteFunction = user.role === "teacher" ? deleteTeacher : deleteStudent;
        // deleteFunction(user);

        const newUsersData = usersData.filter(userData => userData.id !== user.id);
        usersData.length = 0;
        newUsersData.forEach(userData => usersData.push(userData));

        renderUsers("teacher", usersData.filter(userData => userData.role === "teacher"));
        renderUsers("student", usersData.filter(userData => userData.role === "student"));
    } catch {
        window.alert("Ops, algo deu errado. Por favor, tente novamente em instantes.");
    }
}

const renderUsers = (role, users) => {
    const parent = qs(`#${role}s`);
    parent.innerHTML = "";

    const h2 = ce("h2");
    h2.textContent = role === "teacher" ? "Professores" : "Alunos";
    parent.appendChild(h2);
    
    users.forEach(user => {
        const div = ce("div");
        div.classList.add(role);

        const p = ce("p");
        p.textContent = user.name;

        const buttonsDiv = ce("div");
        buttonsDiv.classList.add("user-buttons");

        const deleteButton = buildButton("delete-button", "x", () => deleteUser(user));
        const editButton = buildButton("edit-button", "✏️", () => {
            localStorage.setItem(localStorageUserKey, JSON.stringify(user));
            window.location.href = `${baseLocalUrl}front/html/user_crud.html`;
        });

        buttonsDiv.appendChild(deleteButton);
        buttonsDiv.appendChild(editButton);

        div.appendChild(p);
        div.appendChild(buttonsDiv);
        parent.appendChild(div);
    });
}

const loadTeachers = async () => {
    try {
        const teachers = [
            {
                _id: "1",
                name: "a",
                registration: "1",
                email: "a@a.a",
                phoneNumber: "00 0 00000000"
            },
            {
                _id: "2",
                name: "b",
                registration: "2",
                email: "b@b.b",
                phoneNumber: "00 0 00000000"
            }
        ]; // getTeachers();
        const translatedTeachers = teachers.map(teacher => {
            teacher.role = "teacher";
            return fromBackToFront(teacher);
        }).sort((a, b) => a.name.localeCompare(b.name));

        translatedTeachers.forEach(teacher => usersData.push(teacher));
        renderUsers("teacher", translatedTeachers);
    } catch {
        window.alert("Ops, algo deu errado. Por favor, tente novamente em instantes.");
    }
}

const loadStudents = async () => {
    try {
        const students = [
            {
                _id: "3",
                name: "c",
                registration: "3",
                email: "c@c.c",
                phoneNumber: "00 0 00000000"
            },
            {
                _id: "4",
                name: "d",
                registration: "4",
                email: "d@d.d",
                phoneNumber: "00 0 00000000"
            },
            {
                _id: "5",
                name: "e",
                registration: "5",
                email: "e@e.e",
                phoneNumber: "00 0 00000000"
            }
        ]; // getStudents();
        const translatedStudents = students.map(student => {
            student.role = "student";
            return fromBackToFront(student);
        }).sort((a, b) => a.name.localeCompare(b.name));

        translatedStudents.forEach(student => usersData.push(student));
        renderUsers("student", translatedStudents);
    } catch {
        window.alert("Ops, algo deu errado. Por favor, tente novamente em instantes.");
    }
}

loadTeachers();
loadStudents();
localStorage.setItem(localStorageUserKey, JSON.stringify({}));
