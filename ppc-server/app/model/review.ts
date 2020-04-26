const { Model, DataTypes, Sequelize } = require('sequelize');
import Employee from "./employee";
import { sequelize } from '../utils/db'

class Review extends Model { }
Review.init({
  rid: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
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
    defaultValue: ''
  },
  from: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Employee,
      key: 'uid',
      onDelete: 'CASCADE',
      hooks: true
    }
  },
  to: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Employee,
      key: 'uid',
      onDelete: 'CASCADE',
      hooks: true
    },
  },
}, {
  sequelize,
  modelName: 'review',
  tableName: 'tbl_review',
  timestamps: true,
  updatedAt: 'updateTimestamp',
  validate: true
})

Employee.hasMany(Review, {
  foreignKey: 'to',
  as: 'ReviewTo',
  allowNull: true
})

Employee.hasMany(Review, {
  foreignKey: 'from',
  as: 'ReviewFrom',
  allowNull: true
})
Review.belongsTo(Employee, { foreignKey: 'from', targetKey: 'uid', as: 'ReviewFrom' })
Review.belongsTo(Employee, { foreignKey: 'to', targetKey: 'uid', as: 'ReviewTo' })

// Review.hasOne(Employee, {
//     sourceKey: 'to',
//     foreignKey: 'uid',
//     as: 'ReviewTo',
//     allowNull: true
// });

// Review.hasOne(Employee, {
//     sourceKey: 'from',
//     foreignKey: 'uid',
//     as: 'ReviewFrom',
//     allowNull: true
// });

// Employee.belongsTo(Review, { sourceKey: 'uid' })

export default Review;