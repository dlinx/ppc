const { Model, DataTypes } = require('sequelize');
import Employee from "./employee";
import { sequelize } from '../utils/db'

class Review extends Model { }
Review.init({
    rid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    responsibility: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    learningAbility: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    creativity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    punctuality: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    communication: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    comments: {
        type: DataTypes.STRING(200),
        allowNull: false,

    },
    from: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Employee,
            key: 'uid'
        }
    },
    to: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Employee,
            key: 'uid'
        }
    },
}, {
    sequelize,
    modelName: 'review',
    tableName: 'tbl_review',
    timestamps: true,
    updatedAt: 'updateTimestamp',
})

export default Review