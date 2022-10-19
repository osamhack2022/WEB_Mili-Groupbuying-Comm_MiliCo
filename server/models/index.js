const Sequelize = require('sequelize');
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'].db;
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);

const db = {};

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });


fs.readdirSync(__dirname).filter(file => (file.indexOf('.') !== 0) && (file !== basename)).forEach((file) => {
  const model = require(path.join(__dirname, file))(sequelize, Sequelize);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
