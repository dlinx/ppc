import express from 'express'
import Employee from '../model/employee';
import { Op } from 'sequelize';

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: { exclude: ['password'] }
    })
    res.json(employees)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:uid', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.uid)
    res.json(employee)

  } catch (error) {
    res.status(500).json(error)
  }
})

router.put('/:uid', async (req, res) => {
  try {
    const r = await Employee.update({ ...req.body }, { where: { uid: req.params.uid } })
    res.send(r)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/', async (req, res) => {
  try {
    const r = await Employee.create({ ...req.body })
    res.send(r)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/delete', async (req, res) => {
  try {
    const r = await Employee.destroy({
      where: {
        uid: {
          [Op.or]: req.body.uids
        }
      }
    })
    res.send({ code: 200, message: `Employees deleted ${r}` })
  } catch (error) {
    res.status(500).send(error)
  }
})
export default router;
