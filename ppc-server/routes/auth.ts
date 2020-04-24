import express from 'express'
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router()

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                code: 400,
                message: 'Something went wrong'
            })
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const response = {
                uid: user.uid,
                isAdmin: user.isAdmin
            }
            const token = jwt.sign(response, 'your_jwt_secret', {
                expiresIn: '24h',
                algorithm: 'ES256'
            });
            return res.json({ user: response, token });
        });
    })(req, res);
});

export default router;