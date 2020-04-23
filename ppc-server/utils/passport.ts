import passport from 'passport'
import { Strategy } from 'passport-local'

interface ICredentials {
    [uid: string]: {
        password: string,
        isAdmin: boolean
    }
}
const tempCredentials: ICredentials = {
    user: {
        password: 'pass',
        isAdmin: false
    },
    admin: {
        password: 'pass',
        isAdmin: true
    }
}
export const configurePassport = () => {
    passport.use(new Strategy({
        usernameField: 'uid',
        passwordField: 'password'
    }, (uid, pass, cb) => {
        if (tempCredentials[uid] && tempCredentials[uid].password === pass) {
            cb(null, {
                uid,
                ...tempCredentials[uid]
            }, { message: `Logged In Successfully for : ${uid}` })
        } else {
            cb({ code: 401, message: 'Authentication Failed' }, null, { message: `Authentication failed for ${uid}` })
        }
    }))
}

