import { baseLocalUrl } from "./constants.js";
import { getAndValidateForm } from "./forms.js";

const login = async () => {
    const data = getAndValidateForm();

    if (!data) return;

    window.location.href = `${baseLocalUrl}front/html/classrooms.html`;
}

document.querySelector("#login-button").addEventListener("click", login);
