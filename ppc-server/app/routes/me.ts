import express from 'express'
import Review from '../model/review'
import Employee from '../model/employee'

const router = express.Router();

router.get('/review/requests', async (req: any, res) => {
  try {
    const r = await Review.findAll({
      where: {
        from: req?.user?.uid
      },
      include: {
        model: Employee,
        attributes: ['name'],
        as: 'ReviewTo'
      }
    });
    res.send(r)
  } catch (error) {
    res.status(500).send(error)
  }
});

router.post('/review/submit/:rid', async (req, res) => {
  try {

    const { responsibility, learningAbility, creativity, punctuality,
      communication, comments } = req.body;
    const r = await Review.update({
      responsibility, learningAbility, creativity,
      punctuality, communication, comments
    },
      {
        where: {
          rid: req.params.rid,
          from: req.body.from
        }
      })
    res.send(r)
  } catch (error) {
    res.status(500).send(error)
  }
});

router.get('/review', async (req: any, res) => {
  try {
    const r = await Review.findAll({
      where: {
        to: req?.user?.uid
      },
      attributes: { exclude: ['from'] }
    });
    res.send(r)
  } catch (error) {
    res.status(500).send(error)
  }
});

export default router;