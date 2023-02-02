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

export {
    closeModal,
    openModal,
    buildButton
};
