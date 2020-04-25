import axios from 'axios'

export interface IAuthResponse {
    token?: string
    user?: {
        email: string
        isAdmin: boolean
        name: string
        uid: string
    }
}
const jwt: IAuthResponse = {}

axios.interceptors.request.use((req) => {
    if (jwt.token)
        req.headers['Authorization'] = `Bearer ${jwt.token}`;
    return req
});

export const setAuthResponse = (res: IAuthResponse) => {
    jwt.token = res.token;
    jwt.user = res.user;
}
export default axios;