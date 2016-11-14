var Sequelize = require('sequelize');
var db = new Sequelize('einstoc', 'root', '');

var User = db.define('User', {
  username: { type: Sequelize.STRING, allowNull: false, unique: true }
});

var StockData = db.define('StockData', {
  tickerSymbol: Sequelize.STRING,
  date: { type: Sequelize.DATE, allowNull: false },
  openPrice: { type: Sequelize.FLOAT, allowNull: false },
  closePrice: { type: Sequelize.FLOAT, allowNull: false },
  volume: { type: Sequelize.INTEGER, allowNull: false },
  highPrice: { type: Sequelize.FLOAT, allowNull: false },
  lowPrice: { type: Sequelize.FLOAT, allowNull: false }
});

var Simulation = db.define('Simulation', {
  `frequency` VARCHAR(255) NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `tickerSymbol` VARCHAR(255) NOT NULL,
  `inclusionError` FLOAT NOT NULL,
  `exclusionError` FLOAT NOT NULL,
  `avgReturn` FLOAT NOT NULL,
  `cummuReturn` FLOAT NOT NULL,
  `returnStd` FLOAT NOT NULL,
  `sharpeRatio` FLOAT NOT NULL,
  `benchmarkReturn` FLOAT NOT NULL
});

Simulation.belongTo(User);
User.hasMany(Simulation);

User.sync();
StockData.sync();
Simulation.sync();

exports.User = User;
exports.StockData = StockData;
exports.Simulation = Simulation;