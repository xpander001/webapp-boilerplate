const Sequelize = require('sequelize');
const config = require('../config');

const { Op } = Sequelize;

const sequelize = new Sequelize(config.databaseUrl, {
  operatorsAliases: Op,
  define: {
    freezeTableName: true,
  },
});

module.exports = sequelize;
