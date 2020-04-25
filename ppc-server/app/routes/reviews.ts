import express from 'express'
import Review from '../model/review'

const router = express.Router();



router.get('/:uid', async (req, res) => {
    const review = await Review.find({ where: { uid: req.params.uid } })
    res.send(review)
});

router.post('/:uid', async (req, res) => {
    const r = await Review.update({ where: { uid: req.params.uid } })
    res.send(r)
});

router.get('/', async (req, res) => {
    const reviews = await Review.findAll()
    res.send(reviews)
});

router.post('/', async (req, res) => {
    const r = await Review.bulkCreate(req.body)
    res.send(r)
});


export default router;
