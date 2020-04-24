import Employee from "../app/model/employee";
import Review from "../app/model/review";
import { sequelize } from '../app/utils/db'

const createTables = async () => {
    await Employee.sync({ force: true })
    await Review.sync({ force: true })
}

const createAdminAccount = async () => {
    await sequelize.sync()
    return await Employee.create({
        email: 'root@ppc.local',
        password: 'toor',
        name: 'Root'
    })
}

createTables().then(() => createAdminAccount()).then(val => {
    console.log(val)
    console.log('Admin accounts created')
})