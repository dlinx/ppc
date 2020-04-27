import passport from 'passport'
import { Strategy } from 'passport-local'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import Employee from '../model/employee'

passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, cb) => {
    const emp = await Employee.findOne({ where: { email, password } });
    if (emp) {
        const { email, uid, isAdmin, name, } = emp;
        cb(null, { uid, email, isAdmin, name }, { message: `Logged In Successfully for : ${email}` })
    } else {
        cb({ code: 401, message: 'Authentication Failed' }, null, { message: `Authentication failed for ${email}` })
    }
}))

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || ''
},
    function (jwtPayload, cb) {
        cb(null, jwtPayload);
    }
));
