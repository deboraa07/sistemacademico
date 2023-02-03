import { baseLocalUrl } from "./constants.js";
import { getAndValidateForm } from "./forms.js";
import { signup as fetchSignup } from "./requests.js";

const signup = async () => {
    const data = getAndValidateForm();

    if (!data) return;

    try {
        await fetchSignup(data);
        window.location.href = `${baseLocalUrl}index.html`;
    } catch (error) {
        window.alert(`Ops, algo deu errado. Por favor, tente novamente em instantes. Informações sobre o erro: ${error}`);
    }
}

document.querySelector("#signup-button").addEventListener("click", signup);
