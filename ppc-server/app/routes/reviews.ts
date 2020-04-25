import express from 'express'
import Review from '../model/review'

const router = express.Router();

router.get('/:uid', async (req, res) => {
    try {
        const review = await Review.find({ where: { uid: req.params.uid } })
        res.send(review)
    } catch (error) {
        res.send(error)
    }
});

router.post('/:uid', async (req, res) => {
    try {
        const r = await Review.update({ where: { uid: req.params.uid } })
        res.send(r)
    } catch (error) {
        res.send(error)
    }
});

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
