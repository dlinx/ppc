import { createContext } from 'react';

export interface IUser {
    email?: string
    isAdmin?: boolean
    name?: string
    uid?: string
}
interface IUserCtx {
    user: IUser | null
    setUser: (val: IUser | null) => void
}
export const UserContext = createContext<IUserCtx>({
    user: null,
    setUser: (val: any) => { }
});