var Sequelize = require('sequelize');
var db;
if(process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     match[4],
    host:     match[3],
    logging:  true
  })
} else {
  db = new Sequelize('einstoc', 'root', '', {
    dialect: 'postgres',
    port: 5432,
    logging: false
  })
};

var User = db.define('User', {
  userId: { type: Sequelize.STRING, primaryKey: true}
});

var StockData = db.define('StockData', { //<------ historical data
  tickerSymbol: Sequelize.STRING,
  date: { type: Sequelize.DATE, allowNull: false },
  openPrice: { type: Sequelize.FLOAT, allowNull: false },
  closePrice: { type: Sequelize.FLOAT, allowNull: false },
  volume: { type: Sequelize.INTEGER, allowNull: false },
  highPrice: { type: Sequelize.FLOAT, allowNull: false },
  lowPrice: { type: Sequelize.FLOAT, allowNull: false }
});

var Simulation = db.define('Simulation', {  //<-- store simulated results and evaluation results
  algorithm: { type: Sequelize.STRING, allowNull: false },
  frequency: { type: Sequelize.STRING, allowNull: false },
  startDate: { type: Sequelize.DATE, allowNull: false },
  endDate: { type: Sequelize.DATE, allowNull: false },
  tickerSymbol: { type: Sequelize.STRING, allowNull: false },
  successRate: { type: Sequelize.FLOAT, allowNull: false },
  inclusionError: { type: Sequelize.FLOAT, allowNull: false },
  exclusionError: { type: Sequelize.FLOAT, allowNull: false },
  avgReturn: { type: Sequelize.FLOAT, allowNull: false },
  cummuReturn: { type: Sequelize.FLOAT, allowNull: false },
  returnStd: { type: Sequelize.FLOAT, allowNull: false },
  sharpeRatio: { type: Sequelize.FLOAT, allowNull: false },
  benchmarkReturnSelf: { type: Sequelize.FLOAT, allowNull: false },
  benchmarkReturnMarket: { type: Sequelize.FLOAT, allowNull: false },
  predictedMoves: { type: Sequelize.ARRAY(Sequelize.BOOLEAN), allowNull: false },
  actualMoves: { type: Sequelize.ARRAY(Sequelize.BOOLEAN), allowNull: false },
  totalAssetValues: { type: Sequelize.ARRAY(Sequelize.FLOAT), allowNull: false },
  benchmarkAssetValuesSelf: { type: Sequelize.ARRAY(Sequelize.FLOAT), allowNull: false },
  benchmarkAssetValuesMarket: { type: Sequelize.ARRAY(Sequelize.FLOAT), allowNull: false },
  returns: { type: Sequelize.ARRAY(Sequelize.FLOAT), allowNull: false },
  cashPosition: { type: Sequelize.ARRAY(Sequelize.FLOAT), allowNull: false },
  stockSharesOwned: { type: Sequelize.ARRAY(Sequelize.FLOAT), allowNull: false }
});



Simulation.belongsTo(User);
User.hasMany(Simulation, {as: 'Simulations'});


User.sync();
StockData.sync();
Simulation.sync();

module.exports = {
  User: User,
  StockData: StockData,
  Simulation: Simulation,
  db: db
}