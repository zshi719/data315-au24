# get the consitutents of S & P 500 each year from 2000 to the present
library(readxl)
library(dplyr)
library(lubridate)
library(openxlsx)
library(tidyr)
library(lubridate)


# Load required libraries
library(ggmap)
library(dplyr)

# Set up Google Maps API key (replace 'your_api_key' with your actual API key)
register_google(key = "AIzaSyD3wR5ZmNZmv36w-LbmWixO5JKYmdWRtoI")

# Function to get latitude and longitude
get_lat_long <- function(address) {
  result <- geocode(address, output = "latlona", source = "google")
  return(result)
}

# Add a full address column to the 'current' data for geocoding
current <- current %>%
  mutate(full_address = paste(headquarters_location, "USA", sep = ", "))

# Fetch latitude and longitude for each company's headquarters
current <- current %>%
  rowwise() %>%
  mutate(geo_data = list(get_lat_long(full_address))) %>%
  mutate(latitude = geo_data$lat, longitude = geo_data$lon) %>%
  select(-geo_data)

# Print the updated dataset with latitude and longitude
print(head(current))

```

