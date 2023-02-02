import { localStorageUserKey } from "./constants.js";
import { getAndValidateForm } from "./forms.js";
import { createStudent, createTeacher, updateStudent, updateTeacher } from "./requests.js";

const qs = element => document.querySelector(element);
const ge = element => Array.from(document.getElementsByName(element));

const userData = {
    name: "",
    email: "",
    enrollment: "",
    phoneNumber: "",
    role: ""
};
const parsedUser = JSON.parse(localStorage.getItem(localStorageUserKey));

const updateForm = () => Object.keys(userData).filter(key => key !== "role").forEach(key => qs(`#${key}`).value = userData[key]);

const setRole = () => ge("role").forEach(element => element.checked = element.value === userData.role);

const getInformation = () => {
    if (Object.keys(parsedUser).length === 0) return;

    Object.keys(userData).forEach(key => userData[key] = parsedUser[key]);
    updateForm();
    setRole();
}

const defineApiFunction = () => {
    const requests = {
        createTeacher,
        updateTeacher,
        createStudent,
        updateStudent
    };
    const action = Object.keys(parsedUser).length === 0 ? "create" : "update";
    const target = ge("role").filter(element => element.checked)[0]?.value;

    if (!target){
        window.alert("Por favor, selecione o cargo da pessoa.");
        return null;
    }

    const functionName = action + target.charAt(0).toUpperCase() + target.slice(1);
    return requests[functionName];
}

const saveUser = async () => {
    const data = getAndValidateForm();

    if (!data) return;
    if (!!parsedUser.id) data.id = parsedUser.id;

    const request = defineApiFunction();
    
    if (!request) return;

    try {
        // request(data);
        // window.location.href = `${baseLocalUrl}front/html/users.html`;
    } catch {
        window.alert("Ops, algo deu errado. Por favor, tente novamente em instantes.");
    }
}

qs("#save-button").addEventListener("click", saveUser);
getInformation();
