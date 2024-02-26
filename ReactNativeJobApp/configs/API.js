import axios from "axios";

export const endpoints = {
    'jobs': `/jobs/`,
    'job-details': (jobId) => `/jobs/${jobId}/`,
    
    'get-company-by-user':'/companies/get_companies_by_user/',
    'companies':'/companies/',
    'company-details': (companyId) => `/companies/${companyId}/`,
    'job-company':  (companyId) => `/companies/${companyId}/jobs/`,
    'comments': (companyId) => `/companies/${companyId}/get_comment/`,
    'add-comment': (companyId) => `/companies/${companyId}/add_comment/`,

    'company-user': (userId) => `/users/${userId}/company/`,

    'cv':'/cvs/',
    'job-cv': (jobId) => `/jobs/${jobId}/get_cv/`,
    'user-detail':  (userId) => `/users/${userId}/`,

    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',
    'update-user': (userId) => `/users/${userId}/`,
    'locations':'/locations/',
    'majors':'/majors/',
    'positions':'/positions/'
}

export const authApi = (accessToken) => axios.create({
    baseURL: "https://tramanhvo2103.pythonanywhere.com",
    // baseURL: "http://10.0.2.2:8000",
    headers: {
        "Authorization": `bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: "https://tramanhvo2103.pythonanywhere.com"
    // baseURL:"http://10.0.2.2:8000"
})