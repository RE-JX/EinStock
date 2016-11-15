# Backend API Worker

## API's ready for use
* Yahoo Finance API

## rest/back/ Usage

### Yahoo

We are using the npm yahoo-finance node module for the yahoo API calls. There are currently two functions available for use:

1. apiMethods.yahoo.historical
2. apiMethods.yahoo.snapshot

### Historical

Historical is meant to provide information of the historical stock price for a given stock. Historical is passed a symbol as a string, and two dates as strings using the 'YYYY-MM-DD' day format. The first date is the starting date and the second is the ending date.

_Although currently disabled, Historical also takes in a period argument that has daily, weekly, monthly, dividends only as options._

### Snapshot

Snapshot provides a large variety of data for a stock (_assumed_) today. Snapshot is passed a symbol as a string, and an array containing different options. The options for the array are listed below along with what they give back:

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
| symbol | Meaning | symbol | Meaning | symbol | Meaning |
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

###### Misc
| symbol | Meaning |
|:---:|:---|
| w1 | Day’s Value Change |
| w4 | Day’s Value Change (Realtime) |
| p1 | Price Paid |
| m | Day’s Range |
| m2 | Day’s Range (Realtime) |
| g1 | Holdings Gain Percent |
| g3 | Annualized Gain |
| g4 | Holdings Gain |
| g5 | Holdings Gain Percent (Realtime) |
| g6 | Holdings Gain (Realtime) |


###### System Info
| symbol | Meaning |
|:---:|:---|
| i | More Info |
| j1 | Market Capitalization |
| j3 | Market Cap (Realtime) |
| f6 | Float Shares |
| n | Name |
| n4 | Notes |
| s1 | Shares Owned |
| x | Stock Exchange |
| j2 | Shares Outstanding |

###### Volume
| symbol | Meaning |
|:---:|:---|
| v | Volume |
| a5 | Ask Size |
| b6 | Bid Size |
| k3 | Last Trade Size |
| a2 | Average Daily Volume |



###### Misc
| symbol | Meaning |
|:---:|:---|
| t7 | Ticker Trend |
| t6 | Trade Links |
| i5 | Order Book (Realtime) |
| l2 | High Limit |
| l3 | Low Limit |
| v1 | Holdings Value |
| v7 | Holdings Value (Realtime) |
| s6 | Revenue |
| e1 | Error Indication (returned for symbol changed or invalid) |

