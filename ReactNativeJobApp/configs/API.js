import axios from "axios";

export const endpoints = {
    'jobs': `/jobs/`,
    'job-details': (jobId) => `/jobs/${jobId}/`,

    'companies':'/companies/',
    'company-details': (companyId) => `/companies/${companyId}/`,
    'job-company':  (companyId) => `/companies/${companyId}/jobs/`,
    'add-comment': (lessonId) => `/lessons/${lessonId}/comments/`,
    'cv':'/cvs/',
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',
    'update-user': (userId) => `/users/${userId}/`,
}

export const authApi = (accessToken) => axios.create({
    baseURL: "http://10.0.2.2:8000",
    headers: {
        "Authorization": `bearer ${accessToken}`
    }
})

export default axios.create({
    // baseURL: "https://tramanhvo2103.pythonanywhere.com"
    baseURL:"http://10.0.2.2:8000"
})