import { getBaseUrl } from "./utils.js";

const baseLocalUrl = getBaseUrl();
const localStorageClassroomKey = "classroomInformation";
const localStorageUserKey = "userInformation";

const inputsTranslations = {
    confirmPassword: "confirmar senha",
    email: "email",
    enrollment: "matrícula",
    image: "imagem",
    name: "nome",
    password: "senha",
    phoneNumber: "número de telefone",
    semester: "período",
    teacher: "professor"
};

export {
    baseLocalUrl,
    localStorageClassroomKey,
    localStorageUserKey,
    inputsTranslations
};
