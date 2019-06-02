# Stock Portfolio Suggestion Engine
Project for CmpE 285 Course Lab in the Spring 19 semester at San Jose State University

## Project Description
Our Stock Portfolio Suggestion Engine uses investment strategies like ethical investing, value investing, growth investing, index investing, and quality investing to suggest the best investment options according to the investment amount input by the user. A detailed report of the suggested stock portfolio is presented to the user, through our simple yet elegant user interface.

### App deployed at:
https://stock-portfolio-suggession.herokuapp.com (Please reach out if the URL is not operational)
![](https://github.com/shreyamkela/stock-portfolio-suggestion-engine/blob/master/results-thumbnail.PNG?raw=true)

### Features
1) User will input dollar amount to invest in USD (Minimum is $5000 USD)
2) User can pick one or two investment strategies from the following:
  - Ethical Investing
  - Growth Investing
  - Index Investing
  - Quality Investing
  - Value Investing
3) The engine assigns stocks or ETFs for a selected investment strategy. E.g.
4) Index Investing strategy could map to the following ETFs:
  - Vanguard Total Stock Market ETF (VTI)
  - iShares Core MSCI Total Intl Stk (IXUS)
  - iShares Core 10+ Year USD Bond (ILTB)
5) And, Ethical Investing strategy could map to these stocks:
  - Apple (APPL)
  - Adobe (ADBE)
  - Nestle (NSRGY)
6) Each strategy maps to at least 3 different stocks/ETFs.
7) The suggestion engine will output:
  - Which stocks are selected based on inputed strategies.
  - How the money are divided to buy the suggested stock.
  - The current values (up to the sec via Internet) of the overall portfolio (including all the stocks / ETFs)
  - A weekly trend of the portfolio value. In order words, keep 5 days history of the overall portfolio value.
  
### Team Members
Rohit Maheshwari, Shreyam Kela, Aakash Alurkar
