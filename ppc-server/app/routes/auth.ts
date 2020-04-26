import express from 'express'
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router()

router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json(err)
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(user, 'your_jwt_secret', {
                expiresIn: '24h',
            });
            return res.json({ user, token });
        });
    })(req, res);
});

router.get('/logout', (req, res) => {
    try {
        req.logout();
        res.send('User Logged out');
    } catch (error) {
        res.status(500).send(error)
    }
});

export default router;