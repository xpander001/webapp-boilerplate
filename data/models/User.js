const DataType = require('sequelize');
const Model = require('../sequelize');

const User = Model.define(
  'User',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },

    email: {
      type: DataType.STRING(255),
      validate: { isEmail: true },
    },

    emailConfirmed: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    indexes: [{ fields: ['email'] }],
  },
);

module.exports = User;
