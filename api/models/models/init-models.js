var DataTypes = require("sequelize").DataTypes;
var _Article = require("./Article");
var _User = require("./User");

function initModels(sequelize) {
  var Article = _Article(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);

  Article.belongsTo(User, { as: "user", foreignKey: "userId"});
  User.hasMany(Article, { as: "Articles", foreignKey: "userId"});

  return {
    Article,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
