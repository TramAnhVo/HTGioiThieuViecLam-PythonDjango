import axios from "axios";

export const endpoints = {
    'jobs': `/jobs/`,
    'job-details': (jobId) => `/jobs/${jobId}/`,

    'companies':'/companies/',
    'company-details': (companyId) => `/companies/${companyId}/`,
    'job-company':  (companyId) => `/companies/${companyId}/jobs/`,
    'comments': (companyId) => `/companies/${companyId}/get_comment/`,
    'add-comment': (companyId) => `/lessons/${companyId}/comments/`,

    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',
}

export const authApi = (accessToken) => axios.create({
    baseURL: "https://tramanhvo2103.pythonanywhere.com",
    headers: {
        "Authorization": `bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: "https://tramanhvo2103.pythonanywhere.com"
})