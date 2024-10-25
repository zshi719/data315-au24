# get the consitutents of S & P 500 each year from 2000 to the present
library(readxl)
library(dplyr)
library(lubridate)
library(openxlsx)
library(tidyr)
library(lubridate)

final_tickers_by_year <- read_excel("~/Desktop/HistoricalComponents.xlsx")

df_last_entry_per_year <- final_tickers_by_year %>%
  mutate(year = year(date)) %>%
  group_by(year) %>%              # Group by year
  filter(date == max(date)) %>%
  ungroup()


df_split <- df_last_entry_per_year %>% separate(tickers, into = paste0("", 1:505), sep = ",", fill = "right", extra = "drop")

df_split$date <- as.Date(df_split$date, format = "%Y-%m-%d")

# head(df_split)

write.csv(df_split, "data/constituents.csv")


