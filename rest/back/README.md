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
| p | Previous Close  | p2 | Change in Percent |
| | | | | d2 | Trade Date |
| | | | | t1 | Last Trade Time |


###### Averages
| symbol | Meaning |
|:---:|:---|
| c8 | After Hours Change (Realtime) |
| c3 | Commission |
| g | Day’s Low |
| h | Day’s High |
| k1 | Last Trade (Realtime) With Time |
| l | Last Trade (With Time) |
| l1 | Last Trade (Price Only) |
| t8 | 1 yr Target Price |
| m5 | Change From 200-day Moving Average |
| m6 | Percent Change From 200-day Moving Average |
| m7 | Change From 50-day Moving Average |
| m8 | Percent Change From 50-day Moving Average |
| m3 | 50-day Moving Average |
| m4 | 200-day Moving Average |

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

###### 52 Week Pricing
| symbol | Meaning |
|:---:|:---|
| k | 52-week High |
| j | 52-week Low |
| j5 | Change From 52-week Low |
| k4 | Change From 52-week High |
| j6 | Percent Change From 52-week Low |
| k5 | Percebt Change From 52-week High |
| w | 52-week Range |

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

###### Ratio
| symbol | Meaning |
|:---:|:---|
| e | Earnings Per Share |
| e7 | EPS Estimate Current Year |
| e8 | EPS Estimate Next Year |
| e9 | EPS Estimate Next Quarter |
| b4 | Book Value |
| j4 | EBITDA |
| p5 | Price per Sales |
| p6 | Price per Book |
| r | PE Ratio |
| r2 | PE Ratio (Realtime) |
| r5 | PEG Ratio |
| r6 | Price Per EPS Estimate Current Year |
| r7 | Price Per EPS Estimate Next Year |
| s7 | Short Ratio |

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

