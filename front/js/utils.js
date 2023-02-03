import { baseLocalUrl } from "./constants.js";

const closeModal = () => document.querySelector(".modal").style.display = "none";
const openModal = () => {
    document.querySelector(".modal").style.display = "flex";
    document.querySelector(".modal-background").addEventListener("click", closeModal);
}

const buildButton = (className, text, onClick) => {
    const button = document.createElement("button");
    button.classList.add(className);
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
}

const getToken = () => {
    const cookies = document.cookie;

    if (!cookies.includes("token=")) return null;

    return cookies.split("token=")[1].split(";")[0];
}

const checkAuthorization = () => getToken() ? null : window.location.href = `${baseLocalUrl}`;

const getBaseUrl = () => {
    const origin = window.location.origin  + "/";
    const pathname = window.location.pathname.split("/").find(string => !!string && !string.includes("index.html") && !string.includes("front"));
    return origin + (pathname ? pathname + "/" : ""); 
}

export {
    closeModal,
    openModal,
    buildButton,
    getToken,
    checkAuthorization,
    getBaseUrl
};
