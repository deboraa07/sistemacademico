import { baseLocalUrl } from "./constants.js";
import { getAndValidateForm } from "./forms.js";
import { login as fetchLogin } from "./requests.js";

const login = async () => {
    const data = getAndValidateForm();

    if (!data) return;

    try {
        const {token} = await fetchLogin(data);
        document.cookie = `token=${token};`;
        window.location.href = `${baseLocalUrl}front/html/classrooms.html`;
    } catch (error) {
        window.alert(`Ops, algo deu errado. Por favor, tente novamente em instantes. Informações sobre o erro: ${error}`);
    }
}

document.querySelector("#login-button").addEventListener("click", login);
document.cookie = "";
