import { MAP_HEIGHT, MAP_WIDTH, MAP_LEGEND_X, MAP_LEGEND_Y } from './constants.js';

export const mapSpec = {
    "width": MAP_WIDTH,
    "height": MAP_HEIGHT,
    "title": "Location of Plane Crashes",
    "projection": {
        "type": "equirectangular",
    },
    "align": "left",
    "layer": [
        {
            "data": {
                "url": "https://raw.githubusercontent.com/ryanCYJ/Data-Visualisation/refs/heads/main/data/ne_50m_ocean.json",
                "format": {
                    "type": "topojson",
                    "feature": "ne_50m_ocean"
                }
            },
            "mark": {
                "type": "geoshape",
                "fill": "#91C8E4",
            },
        },
        {
            "data": {
                "url": "https://raw.githubusercontent.com/ryanCYJ/Data-Visualisation/refs/heads/main/data/ne_110m_admin_0_countries.json",
                "format": {
                    "type": "topojson",
                    "feature": "ne_110m_admin_0_countries"
                }
            },
            "mark": {
                "type": "geoshape",
                "fill": "#FBF5DE",
                "stroke": "#EAC8A6"
            },
        },
        {
            "data": { "graticule": { "step": [30, 30] } },
            "mark": { "type": "geoshape", "stroke": "#DCDCDC" },
        },
        {
            "data": {
                "values": [
                    { "name": "Atlantic Ocean", "longitude": -35, "latitude": 15 },
                    { "name": "Pacific Ocean", "longitude": -140, "latitude": 0 },
                    { "name": "Indian Ocean", "longitude": 80, "latitude": -20 },
                    { "name": "Southern Ocean", "longitude": 0, "latitude": -65 },
                    { "name": "Arctic Ocean", "longitude": 0, "latitude": 72 }
                ]
            },
            "mark": {
                "type": "text",
                "fontSize": 16,
                "fontStyle": "italic",
                "fill": "#3A59D1"
            },
            "encoding": {
                "longitude": { "field": "longitude", "type": "quantitative" },
                "latitude": { "field": "latitude", "type": "quantitative" },
                "text": { "field": "name" }
            }
        },
        {
            "transform": [
                {
                    "calculate": "year(timeParse(datum.Date, '%B %d, %Y'))",
                    "as": "Year"
                },
                {
                    "filter": "yearFilter == 'All' || datum.Year == yearFilter"
                }
            ],
            "mark": "circle",
            "encoding": {
                "longitude": {
                    "field": "Longitude",
                    "type": "quantitative"
                },
                "latitude": {
                    "field": "Latitude",
                    "type": "quantitative"
                },
                "size": {
                    "bin": { "step": 50 },
                    "field": "Fatalities Total",
                    "type": "quantitative",
                    "scale": { "range": [10, 100] },
                    "legend": {
                        "title": "Total Fatalities",
                        "orient": "none",
                        "direction": "vertical",
                        "legendX": MAP_LEGEND_X,
                        "legendY": MAP_LEGEND_Y,
                    }
                },
                "color": { "value": "#DC3C22" },
                "tooltip": [
                    { "field": "Date" },
                    { "field": "Location" },
                    { "field": "Operator" },
                    { "field": "Route" },
                    { "field": "Aboard Total" },
                    { "field": "Fatalities Total" },
                    { "field": "Ground" },
                    { "field": "Summary" },
                ],
            }
        }
    ]
}