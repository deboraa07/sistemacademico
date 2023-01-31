import { inputsTranslations } from "./constants.js";
import { inputValidationFunctions } from "./validations.js";

const getInputs = () => {
    return Array.from(document.querySelectorAll("form input"))
        .filter(input => input.type !== "radio")
        .reduce((object, input) => ({...object, [input.name]: input.value}), {});
}

const validateInputs = data => {
    const keys = Object.keys(data);
    const validations = inputValidationFunctions();

    const inputsWithIssues = keys.filter(key => !validations[key](data));

    return inputsWithIssues.length > 0 ? inputsWithIssues : false;
}

const generateInputsWarning = inputsWithIssues => {
    const messageStart = "Há uma inconsistência no(s) seguinte(s) campo(s): ";
    const messageInfo = inputsWithIssues.reduce((string, input) => (
        `${string}"${inputsTranslations[input]}", `
    ), "");

    return messageStart + messageInfo.substring(0, messageInfo.length - 2) + ".";
}

const getAndValidateForm = () => {
    const data = getInputs();
    const inputsWithIssues = validateInputs(data);

    if (inputsWithIssues){
        window.alert(generateInputsWarning(inputsWithIssues));
        return false;
    }

    return data;
}

export { getAndValidateForm };
