import express from 'express'
import Employee from '../model/employee';

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const employees = await Employee.findAll({
    attributes: { exclude: ['password'] }
  })
  res.json(employees)
});

export default router;
