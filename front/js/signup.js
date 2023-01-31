import { baseLocalUrl } from "./constants.js";
import { getAndValidateForm } from "./forms.js";

const signup = async () => {
    const data = getAndValidateForm();

    if (!data) return;

    window.location.href = `${baseLocalUrl}index.html`;
}

document.querySelector("#signup-button").addEventListener("click", signup);
