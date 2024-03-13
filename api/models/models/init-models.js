var DataTypes = require("sequelize").DataTypes;
var _Article = require("./Article");
var _User = require("./User");
var _doctrine_migration_versions = require("./doctrine_migration_versions");
var _messenger_messages = require("./messenger_messages");
var _sessions = require("./sessions");

function initModels(sequelize) {
  var Article = _Article(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var doctrine_migration_versions = _doctrine_migration_versions(sequelize, DataTypes);
  var messenger_messages = _messenger_messages(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);


  return {
    Article,
    User,
    doctrine_migration_versions,
    messenger_messages,
    sessions,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
