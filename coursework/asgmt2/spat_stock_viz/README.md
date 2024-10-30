# SpatioTemporal-Stock Dashboard README

## Overview

The Spatio-Temporal-Stock Dashboard is designed to provides a dynamic exploration of the S&P 500 by visualizing data on corporate headquarters, market capitalization, sector distribution, and company founding dates. It is developed using D3.js in a svelte framework. By integrating interactive features like click-to-filter, brush selection, hover tooltips, and cross-filtering, the dashboard allows users to navigate through various aspects of the S&P 500 companies' data, focusing on:

-   Geographical Distribution by headquarters location.
-   Market capitalization by sector and by individual company.
-   Temporal analysis of company founding years.
-   A sector and its sub-industry.

## Project Structure

```         
project-root/
├── public/
│   ├── company_data_full.csv       # Main data file with company information
│   ├── us-states.json              # GeoJSON file for US state boundaries
│   ├── my_geometry.geojson         # GeoJSON file for city data
├── src/
│   ├── lib/
│   │   ├── app.css                 # Main stylesheet for styling
│   ├── App.svelte                  # Main Svelte file for dashboard layout
│   ├── line.js                     # JavaScript file for line chart
│   ├── map.js                      # JavaScript file for map chart
│   ├── bar.js                      # JavaScript file for bar chart on market index
│   ├── bar2.js                     # JavaScript file for bar chart on market price
│   ├── tree.js                     # JavaScript file for treemap visualization
├── README.md                       # Project documentation
├── package.json                    # Dependencies and project metadata
├── svelte.config.js                # Svelte configuration file
├── vite.config.js                  # Vite configuration file
└── index.html                      # Main HTML file
```

## Installation

1.  **Clone the repository**:

    ``` bash
    git clone https://github.com/zshi719/SpatioTemporalSP500_VIZ.git

    cd SpatioTemporalSP500_VIZ
    ```

2.  **Install dependencies**: Ensure you have [Node.js](https://nodejs.org/) installed, then run:

    ``` bash
    npm install
    ```

3.  **Start the development server**:

    ``` bash
    npm run dev
    ```

4.  **Build the project**: For production, run:

    ``` bash
    npm run build
    ```

5.  **Preview the production build**:

    ``` bash
    npm run preview
    ```

    [View Dashboard](http://localhost:4173/){.uri}

### Usage

After starting the development server, the dashboard should be accessible locally. The main components include:

-   **Map Visualization**: Color-coded by market cap per state, with additional city-level data marked by circles.
-   **Bar Charts**: Two bar charts showing market cap as a percentage and absolute value, organized by sector.
-   **Line Chart**: Displays the number of companies founded each year.
-   **Treemap**: Shows the hierarchical relationships between sectors and sub-industries.

### Data Requirements

-   `company_data_full.csv`: CSV file with columns for company headquarters location, market capitalization, founding date, and sector.
-   `us-states.json`: GeoJSON file containing US state boundaries.
-   `my_geometry.geojson`: GeoJSON file containing specific city data.

Data is loaded from .csv, geojson, and .json files in the `/public` directory. Ensure these files are correctly referenced in the code.

### Dependencies

-   [**Svelte**](https://svelte.dev/): Front-end framework used for creating the dashboard structure.
-   [**D3.js**](https://d3js.org/): Library for data-driven document manipulation.
-   [**Vite**](https://vitejs.dev/): Build tool and development server.
-   **d3-svg-legend**: Supporting D3 modules for data processing, scaling, and color legends.

### Configuration

Modify the following files if necessary:

-   `svelte.config.js`: Svelte-specific configurations.
-   `vite.config.js`: Configuration for Vite, including plugins and build options.
-   `package.json`: Project dependencies and scripts.

### Troubleshooting

-   **Vite Build Errors**: Ensure all paths to data files (`company_data_full.csv`, `us-states.json`, `my_geometry.geojson`) are correct and the files are accessible in the `/public` directory.
-   **CSS Issues**: Check the `app.css` in the `lib` folder for styling conflicts.
-   **Data Parsing**: If charts do not render correctly, ensure the data format in `company_data_full.csv` matches the expected structure in the code.

## Visualization & Design

### Main Components

-   **Interactive Map**: Displays the geographical distribution of company headquarters with color-coded states based on market capitalization.
-   **Bar Charts**: Shows market capitalization by sector in both percentage and absolute terms.
-   **Line Chart**: Illustrates the number of companies founded over time.
-   **Treemap**: Visualizes the hierarchical relationship between sectors their and sub-industries.
-   **Tooltips**: Provides detailed information on hover, including market capitalization details for cities and states.
-   **Responsive Design**: The dashboard is designed to be responsive and accessible on various devices.

### Four Primary Visualizations

### VIZ 1. Market Capitalization by Corporate Headquarters (HQ)

-   This map displays S&P 500 companies’ headquarters across the United States, with red circles indicating HQs at the city level and circle size representing market capitalization. A blue gradient shows the total market cap by state.

-   Key Insights:

    -   Users will see major economic hubs like California and New York, driven by tech and finance sectors.

    -   By selecting states with lower market caps, like Indiana or Tennessee, users can observe how less prominent regions contribute unique companies to the S&P 500.

-   Interaction: Hover over a state for market cap details; double-click to reset filters. When selecting a region, all views dynamically update to reflect data from that region.

-   Design Principles: A simple color gradient for states and red circles for HQs allow users to immediately grasp the concentration of corporate influence geographically.

#### VIZ 2 Sector Performance by Market Capitalization

-   This bar chart compares sectors by Market Capitalization Index and Total Market Cap. Yellow bars represent index weight, while purple bars represent total market cap.

-   Key Insights:

    -   Dominance of Information Technology is evident, with high metrics driven by companies.

    -   Consumer Discretionary shows moderate market cap index but high market cap price, reflecting the sector’s consistency in consumer demand.

-   Interaction: Hover over a bar for details; single-click to filter across other views; double-click to reset.

-   Design Principles: Contrasting colors for differentiate metrics. Side-by-side bars enable quick, intuitive comparisons across sectors.

#### VIZ 3 Number of Companies Founded Over Time

-   This timeline chart shows the number of companies founded over time, with peaks in entrepreneurial activity over different eras.

-   Key Insights:

    -   Peaks in the late 1990s reflect the dot-com boom, while more recent years show diversification across sectors.

    -   Brushing over these periods + checking out VIZ 4 on sectors reveal that many new companies are clustered in technology and healthcare, reflecting modern economic shifts.

-   Interaction: Users can brush over the timeline to focus on specific years, with cross-filtered data updating the other visualizations accordingly.

-   Design Principles: Minimalist lines and points make the trend easy to follow. The brush feature offers an intuitive way to zoom into specific periods.

#### VIZ 4 Radial Tree (Sector and Sub-industry)

-   This radial tree plot shows the hierarchical structure of sectors and their sub-industries. Solid dots represent sectors, while hollow dots represent sub-industries.

-   Key Insights:

    -   Sectors like Information Technology have a broad array of sub-industries (e.g., IT consulting, software services), while sectors like Utilities are more specialized.

    -   Selecting a sector reveals its geographic and temporal distribution across the dashboard.

-   Interaction: Click a sector to filter the dashboard by that sector.

-   Design Principles: A circular layout groups related industries naturally (tried to add color-coding and toggleable labels for all sectors and sub-industries but did not figure out how to maintain a clean presentation as opposed to having labels and texts overwhelm the screen.

### 
