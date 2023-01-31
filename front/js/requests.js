import { baseApiUrl } from "./constants";

const classroomPath = "api/classroom/";

const buildRequestObject = ({method, headers, body}) => {
    return {
        method: method || "GET",
        headers: headers || {},
        body: body || {}
    }
}

const request = async (path, object) => fetch(`${baseApiUrl}${path}`, object).then(response => response.json());

const getClassrooms = async () => request(classroomPath, buildRequestObject());
const createClassroom = async (data) => request(classroomPath, buildRequestObject({method: "POST", body: data}));
const updateClassroom = async (data) => request(`${classroomPath}${data.id}`, buildRequestObject({method: "PUT", body: data}));
const deleteClassroom = async (data) => request(`${classroomPath}${data.id}`, buildRequestObject({method: "DELETE"}));

export {
    getClassrooms,
    createClassroom,
    updateClassroom,
    deleteClassroom
};
