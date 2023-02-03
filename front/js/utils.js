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

export {
    closeModal,
    openModal,
    buildButton,
    getToken
};
