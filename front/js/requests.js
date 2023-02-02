import { baseApiUrl } from "./constants.js";
import { fromFrontToBack } from "./translator.js";

const studentPath = "api/student/";
const teacherPath = "api/teacher/";
const classroomPath = "api/classroom/";

const buildRequestObject = ({method = "GET", headers = {}, body = {}}) => {
    return {
        method: method,
        headers: headers,
        body: fromFrontToBack(body)
    }
}

const request = async (path, object) => fetch(`${baseApiUrl}${path}`, object).then(response => response.json());

const getStudents = async () => request(`${studentPath}`, buildRequestObject());
const createStudent = async (data) => request(`${studentPath}`, buildRequestObject({method: "POST", body: data}));
const updateStudent = async (data) => request(`${studentPath}${data.enrollment}`, buildRequestObject({method: "PUT", body: data}));
const deleteStudent = async (data) => request(`${studentPath}${data.enrollment}`, buildRequestObject({method: "DELETE"}));

const getTeachers = async () => request(`${teacherPath}`, buildRequestObject());
const createTeacher = async (data) => request(`${teacherPath}`, buildRequestObject({method: "POST", body: data}));
const updateTeacher = async (data) => request(`${teacherPath}${data.enrollment}`, buildRequestObject({method: "PUT", body: data}));
const deleteTeacher = async (data) => request(`${teacherPath}${data.enrollment}`, buildRequestObject({method: "DELETE"}));

const getClassrooms = async () => request(classroomPath, buildRequestObject());
const createClassroom = async (data) => request(classroomPath, buildRequestObject({method: "POST", body: data}));
const updateClassroom = async (data) => request(`${classroomPath}${data.id}`, buildRequestObject({method: "PUT", body: data}));
const deleteClassroom = async (data) => request(`${classroomPath}${data.id}`, buildRequestObject({method: "DELETE"}));

export {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,

    getTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher,

    getClassrooms,
    createClassroom,
    updateClassroom,
    deleteClassroom
};
