CREATE TABLE `Simulations` (
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
	`benchmarkReturn` FLOAT NOT NULL,
	`userID` VARCHAR(255) NOT NULL,
	`ID` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`ID`)
);

CREATE TABLE `Performance` (
	`date` DATE NOT NULL,
	`time` TIMESTAMP NOT NULL,
	`predictedMove` BOOLEAN NOT NULL,
	`actualMove` BOOLEAN NOT NULL,
	`assetValue` FLOAT NOT NULL,
	`return` FLOAT NOT NULL,
	`simulationID` FLOAT NOT NULL,
	`ID` FLOAT NOT NULL,
	PRIMARY KEY (`ID`)
);

CREATE TABLE `User` (
	`username` VARCHAR(255) NOT NULL,
	`userID` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`userID`)
);

CREATE TABLE `StockData` (
	`tickerSymbol` VARCHAR(255) NOT NULL,
	`Date` DATE NOT NULL,
	`DateTime` TIMESTAMP,
	`OpenPrice` FLOAT NOT NULL,
	`ClosePrice` FLOAT NOT NULL,
	`Volume` FLOAT NOT NULL,
	`highPrice` FLOAT NOT NULL,
	`lowPrice` FLOAT NOT NULL,
	`ID` FLOAT NOT NULL,
	PRIMARY KEY (`ID`)
);

ALTER TABLE `Simulations` ADD CONSTRAINT `Simulations_fk0` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`);

ALTER TABLE `Performance` ADD CONSTRAINT `Performance_fk0` FOREIGN KEY (`simulationID`) REFERENCES `Simulations`(`ID`);

