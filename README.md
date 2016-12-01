# Einstock Algo Trader

> A stock trading simulation app that uses machine learning algorithms to predict equity price trends.

## Team

  - __Product Owner__: Kevin Kim
  - __Scrum Master__: Lucas Hawes
  - __Lead Frontend Engineer__: Aaron Stevens
  - __Lead Backend Engineer__: Natasha Che

## Table of Contents

1. [Features](#features)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks] (#tasks)
1. [Contributing](#contributing)

## Features

### Multiple algorithms
> Popular machine learning algorithms, including K Nearest Neighbors, Logistic regressions, Naive Bayes, Neural Networks, and Random Forests, are available for testing

### Wide range of equity selections
> Users can test algorithm performance with historical data for over 7000 stocks traded on NYSE and Nasdaq

### Hassle-free trade simulation
> Buying and selling decisions are automatically generated according to the price predictions from the selected algorithm

### Comprehensive evaluation
> Einstock reports various assessment metrics after a simulation run to evaluate an algorithm's performance against market benchmarks

## Requirements

- Node 6.1.x
- Postgresql 9.1.x

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
bower install
```

### Tasks
Start the local database:
```sh
postgres -D /usr/local/var/postgres
```
Start the server:
```sh
npm start
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
