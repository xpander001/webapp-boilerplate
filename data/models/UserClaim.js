const DataType = require('sequelize');
const Model = require('../sequelize');

const UserClaim = Model.define('UserClaim', {
  type: {
    type: DataType.STRING,
  },

  value: {
    type: DataType.STRING,
  },
});

module.exports = UserClaim;
