import apiUrl from "./api_url.js";
import { fromFrontToBack } from "./translator.js";

const adminPath =  "api/admin/";
const studentPath = "api/student/";
const teacherPath = "api/teacher/";
const classroomPath = "api/classroom/";

const buildRequestObject = ({method, body, authorization}) => {
    return {
        method: method,
        headers: {"Content-Type": "application/json", "authorization": authorization ? authorization : null},
        body: method !== "GET" ? fromFrontToBack(body || {}) : null
    }
}

const request = async (path, object) => {
    const apiResponse = await fetch(`${apiUrl}${path}`, object).then(response => response.json());

    if (apiResponse.error) throw new Error(apiResponse.error);

    return apiResponse;
};

const signup = async (data) => request(`${adminPath}signup`, buildRequestObject({method: "POST", body: data}));
const login = async (data) => request(`${adminPath}login`, buildRequestObject({method: "POST", body: data}));

const getStudents = async () => request(`${studentPath}`, buildRequestObject({method: "GET"}));
const getStudent = async (data) => request(`${studentPath}${data.enrollment}`, buildRequestObject({method: "GET"}));
const createStudent = async (data, authorization) => request(`${studentPath}`, buildRequestObject({method: "POST", body: data, authorization}));
const updateStudent = async (data, authorization) => request(`${studentPath}${data.enrollment}`, buildRequestObject({method: "PUT", body: data, authorization}));
const deleteStudent = async (data, authorization) => request(`${studentPath}${data.enrollment}`, buildRequestObject({method: "DELETE", authorization}));

const getTeachers = async () => request(`${teacherPath}`, buildRequestObject({method: "GET"}));
const createTeacher = async (data, authorization) => request(`${teacherPath}`, buildRequestObject({method: "POST", body: data, authorization}));
const updateTeacher = async (data, authorization) => request(`${teacherPath}${data.enrollment}`, buildRequestObject({method: "PUT", body: data, authorization}));
const deleteTeacher = async (data, authorization) => request(`${teacherPath}${data.enrollment}`, buildRequestObject({method: "DELETE", authorization}));

const getClassrooms = async () => request(classroomPath, buildRequestObject({method: "GET"}));
const createClassroom = async (data, authorization) => request(classroomPath, buildRequestObject({method: "POST", body: data, authorization}));
const updateClassroom = async (data, authorization) => request(`${classroomPath}${data.id}`, buildRequestObject({method: "PUT", body: data, authorization}));
const deleteClassroom = async (data, authorization) => request(`${classroomPath}${data.id}`, buildRequestObject({method: "DELETE", authorization}));

export {
    signup,
    login,

    getStudents,
    getStudent,
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
