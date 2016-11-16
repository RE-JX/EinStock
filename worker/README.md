# Backend API Worker

## API's ready for use
* Yahoo Finance API
* ~~Google Finance API~~

## rest/back/ Usage

### Yahoo

We are using the npm yahoo-finance node module for the yahoo API calls. There are currently two functions available for use:

1. apiMethods.yahoo.historical
2. apiMethods.yahoo.snapshot

Both are meant to be used as promises.

### Google
### BROKEN, do not use

We are using the npm google-finance node module for the google API calls. There are currently two functions available for use:

1. apiMethods.google.historical
2. apiMethods.google.snapshot

Both are meant to be used as promises.

### Yahoo Historical

Historical is meant to provide information of the historical stock price for a given stock. Historical is passed a symbol as a string, and two dates as strings using the 'YYYY-MM-DD' day format. The first date is the starting date and the second is the ending date.

_Although currently disabled, Historical also takes in a period argument that has daily, weekly, monthly, dividends only as options._

###### Example inputs

| Argument | Input | example |
|---|---|---|
| sym | String, stock symbol | 'AAPL' |
| frm | String, from date YYYY-MM-DD | '2012-01-01' |
| to | String, to date YYYY-MM-DD | '2012-01-10' |

###### Example output:

```javascript
 [ { date: 'Tue Jan 10 2012 00:00:00 GMT-0800 (PST)',
    open: 425.909988,
    high: 426.000004,
    low: 421.500008,
    close: 423.239994,
    volume: 64549100,
    adjClose: 55.072523,
    symbol: 'AAPL' } ]
```

---

### Yahoo Snapshot

Snapshot provides a large variety of data for a stock (_assumed_) today. Snapshot is passed a symbol as a string, and an array containing different options. The options for the array are listed below along with what they give back.

###### Example inputs

| Argument | Input | example |
|---|---|---|
| sym | String, stock symbol | 'AAPL' |
| flds | Array of Strings | ['s', 'n', 'd1', 'l1', 'y', 'r'] |


###### Example output:

```javascript
{ symbol: 'AAPL',
  name: 'Apple Inc.',
  lastTradeDate: 'Mon Nov 14 2016 00:00:00 GMT-0800 (PST)',
  lastTradePriceOnly: 105.71,
  dividendYield: 2.1,
  peRatio: 12.72 }
```


Snapshot Array Options
------

###### Symbol
| symbol | Meaning |
|:---:|:---|
| s | Stock Symbol |

###### Pricing, Dividends, Date
| Pricing | Pricing | Dividends | Dividends | Date | Date |
|:---:|:---|:---:|:---|:---:|:---|
| a | Ask | y | Dividend Yield | c1 | Change |
| b | Bid | d | Dividend Per Share | c | Change And Percent Change |
| b2 | Ask (Realtime) | r1 | Dividend Pay Date | c6 | Change (Realtime) |
| b3 | Bid (Realtime) | q | Ex-Dividend Date | k2 | Change Percent (Realtime) |
| p | Previous Close  | p2 | Change in Percent | d2 | Trade Date |
| | | | | t1 | Last Trade Time |

###### Averages, Ratio, 52 Week Pricing
| Averages | Averages | Ratio | Ratio | 52 Week Pricing | 52 Week Pricing |
|:---:|:---|:---:|:---|:---:|:---|
| c8 | After Hours Change (Realtime) | e | Earnings Per Share | k | 52-week High |
| c3 | Commission | e7 | EPS Estimate Current Year | j | 52-week Low |
| g | Day’s Low | e8 | EPS Estimate Next Year | j5 | Change From 52-week Low |
| h | Day’s High | e9 | EPS Estimate Next Quarter | k4 | Change From 52-week High |
| k1 | Last Trade (Realtime) With Time | b4 | Book Value | j6 | Percent Change From 52-week Low |
| l | Last Trade (With Time) | j4 | EBITDA | k5 | Percebt Change From 52-week High |
| l1 | Last Trade (Price Only) | p5 | Price per Sales | w | 52-week Range |
| t8 | 1 yr Target Price | p6 | Price per Book |
| m5 | Change From 200-day Moving Average | r | PE Ratio |
| m6 | Percent Change From 200-day Moving Average | r2 | PE Ratio (Realtime) |
| m7 | Change From 50-day Moving Average | r5 | PEG Ratio |
| m8 | Percent Change From 50-day Moving Average | r6 | Price Per EPS Estimate Current Year |
| m3 | 50-day Moving Average | r7 | Price Per EPS Estimate Next Year |
| m4 | 200-day Moving Average | s7 | Short Ratio |

###### System Info, Volume
| System Info | System Info | Volume | Volume
|:---:|:---|:---:|:---
| i | More Info | v | Volume
| j1 | Market Capitalization | a5 | Ask Size
| j3 | Market Cap (Realtime) | b6 | Bid Size
| f6 | Float Shares | k3 | Last Trade Size
| n | Name | a2 | Average Daily Volume
| n4 | Notes
| s1 | Shares Owned
| x | Stock Exchange
| j2 | Shares Outstanding

###### Misc
| Misc | Misc | Misc | Misc |
|:---:|:---|:---:|:---|
| w1 | Day’s Value Change | t7 | Ticker Trend |
| w4 | Day’s Value Change (Realtime) | t6 | Trade Links |
| p1 | Price Paid | i5 | Order Book (Realtime) |
| m | Day’s Range | l2 | High Limit |
| m2 | Day’s Range (Realtime) | l3 | Low Limit |
| g1 | Holdings Gain Percent | v1 | Holdings Value |
| g3 | Annualized Gain | v7 | Holdings Value (Realtime) |
| g4 | Holdings Gain | s6 | Revenue |
| g5 | Holdings Gain Percent (Realtime) | e1 | Error Indication (returned for symbol changed or invalid) |
| g6 | Holdings Gain (Realtime) |

---