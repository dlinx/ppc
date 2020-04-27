import axios from 'axios'

const api = axios.create()

export interface IAuthResponse {
    token?: string
    user?: {
        email: string
        isAdmin: boolean
        name: string
        uid: string
    }
}
const jwt: IAuthResponse = {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user') || '{}')
}

api.interceptors.request.use((req) => {
    if (jwt.token)
        req.headers['Authorization'] = `Bearer ${jwt.token}`;
    return req
});

api.interceptors.response.use(res => res, (err) => {
    if (err.response.status === 401) {
        window.location.href = '/login';
    }
    return Promise.reject(err);
})

export const setAuthResponse = (res: IAuthResponse) => {
    jwt.token = res.token;
    jwt.user = res.user;
    localStorage.setItem('token', res.token || '')
    localStorage.setItem('user', JSON.stringify(res.user || {}))
}


export default api;