import { Sequelize } from "sequelize";
import Employee from "../app/model/employee";
import Review from "../app/model/review";
const sequelize = new Sequelize('sqlite:./db/ppc-db.db.sqlite');

const createTables = async () => {
    await Employee.sync({ force: true })
    await Review.sync({ force: true })
}

const createAdminAccount = async () => {
    await sequelize.sync()
    return await Employee.create({
        email: 'root@ppc.local',
        password: 'toor',
        name: 'Root',
        isAdmin: true
    })
}
const createEmployees = async () => {
    await sequelize.sync()
    for (let i = 0; i < 10; i++) {
        const randomEmp = Math.random().toString(36).substr(2)
        await Employee.create({
            email: `${randomEmp}@ppc.local`,
            password: 'test',
            name: randomEmp,
            isAdmin: false
        });
        console.log(`${i + 1} employees created`)
    }
    return;
}

createTables()
    .then(() => createEmployees())
    .then(() => createAdminAccount())
    .then(val => {
        console.log(val)
        console.log('Initial data created')
    }).catch(err => {
        console.log(err)
    })