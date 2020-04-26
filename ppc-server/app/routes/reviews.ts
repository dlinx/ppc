import express from 'express'
import Review from '../model/review'
import Employee from '../model/employee';

const router = express.Router();

router.get('/:rid', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.rid)
        res.send(review)
    } catch (error) {
        res.send(error)
    }
});

router.get('/to/:uid', async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { to: req.params.uid },
            include: {
                model: Employee,
                attributes: ['name'],
                as: 'ReviewFrom'
            }
        })
        res.send(reviews)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.findAll()
        res.send(reviews)
    } catch (error) {
        res.send(error)
    }
});

router.post('/', async (req, res) => {
    try {
        const r = await Review.bulkCreate(req.body.reviews)
        res.send(r)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

export default router;
