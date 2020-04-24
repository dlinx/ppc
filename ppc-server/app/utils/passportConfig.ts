import passport from 'passport'
import { Strategy } from 'passport-local'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'

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

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
    function (jwtPayload, cb) {
        cb(null, jwtPayload);
    }
));
