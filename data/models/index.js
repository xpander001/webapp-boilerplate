const sequelize = require('../sequelize');
const User = require('./User');
const UserProfile = require('./UserProfile');
const UserClaim = require('./UserClaim');
const UserLogin = require('./UserLogin');

User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(UserClaim, {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

function sync(...args) {
  return sequelize.sync(...args);
}

exports.User = User;
exports.UserLogin = UserLogin;
exports.UserClaim = UserClaim;
exports.UserProfile = UserProfile;
exports.sync = sync;
