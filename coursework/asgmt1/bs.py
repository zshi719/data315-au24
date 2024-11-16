import pandas as pd
import yfinance as yf
from bs4 import BeautifulSoup
import requests

# Step 1: Scrape S&P 500 Company Data
url = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Extract tables from the webpage
tables = pd.read_html(url)
current = tables[0]  # Current S&P 500 companies
history = tables[1]  # Historical changes

# Clean and process the 'current' table
current = current.rename(columns=str.lower).dropna()
current['founded'] = pd.to_numeric(current['founded'], errors='coerce')
current['date_added'] = pd.to_datetime(current['date_added'], errors='coerce')

# Clean and process the 'history' table
history = history.rename(columns=str.lower).dropna()
history['date'] = pd.to_datetime(history['date'], errors='coerce')

# Step 2: Fetch Stock Price Data for Current Companies
# Create a list of symbols (replace "." with "-" if needed)
symbols = current['symbol'].str.replace('.', '-', regex=False).tolist()

# Fetch stock price data for all symbols using yfinance
start_date = '2023-01-01'
end_date = '2023-12-31'

price_data_list = []
for symbol in symbols:
    print(f"Fetching data for {symbol}...")
    try:
        stock_data = yf.download(symbol, start=start_date, end=end_date)
        stock_data['symbol'] = symbol
        price_data_list.append(stock_data)
    except Exception as e:
        print(f"Failed to fetch data for {symbol}: {e}")

# Combine all stock data into a single DataFrame
price_data = pd.concat(price_data_list).reset_index()

# Step 3: Calculate Daily Returns
price_data['return'] = price_data.groupby('symbol')['adj close'].apply(
    lambda x: x.pct_change() * 100
)

# Drop rows with missing values
returns_all = price_data.dropna()

# Step 4: Prepare Final Datasets
# Select relevant columns for analysis
returns = returns_all[['date', 'symbol', 'open', 'high', 'low', 'close', 'adj close', 'volume', 'return']]

# Convert to wide format (similar to pivot_wider in R)
returns_wide = returns.pivot(index='date', columns='symbol', values='return')

# Save data for later use
returns_all.to_csv('returns_all.csv', index=False)
returns_wide.to_csv('returns_wide.csv')

# Print data overview
print("Returns All Overview:")
print(returns_all.head())

print("\nReturns Wide Overview:")
print(returns_wide.head())

