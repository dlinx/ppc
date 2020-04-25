const { Sequelize, Model, DataTypes } = require('sequelize');
import { sequelize } from '../utils/db'
export interface IEmployee {
    uid: number,
    email: string,
    password: string,
    name: string,
    isAdmin: boolean
}

class Employee extends Model { }
Employee.init({
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        isUUID: true,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        isEmail: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize,
    modelName: 'employee',
    tableName: 'tbl_employee',
    timestamps: true,
    updatedAt: 'updateTimestamp',
    validate: true
})

export default Employee;