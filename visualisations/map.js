import { MAP_HEIGHT, MAP_WIDTH, MAP_LEGEND_X, MAP_LEGEND_Y } from './constants.js';

export const mapSpec = {
    "width": MAP_WIDTH,
    "height": MAP_HEIGHT,
    "title": {
        "text": "Location of Plane Crashes",
        "fontSize": 24,
    },
    "projection": {
        "type": "equirectangular",
    },
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
                "fill": "#f3fdffff",
            },
        },
        {
            "data": {
                "url": "https://raw.githubusercontent.com/ryanCYJ/Data-Visualisation/refs/heads/main/data/ne_50m_admin_0_countries.json",
                "format": {
                    "type": "topojson",
                    "feature": "ne_50m_admin_0_countries"
                }
            },
            "mark": {
                "type": "geoshape",
                "fill": "#fff1d2ff",
                "stroke": "#e9dbbdff"
            },
        },
        {
            "data": { "graticule": { "step": [30, 30] } },
            "mark": { "type": "geoshape", "stroke": "#DCDCDC" },
        },
        {
            "data": {
                "values": [
                    { "name": "Atlantic Ocean", "longitude": -40, "latitude": 15 },
                    { "name": "Pacific Ocean", "longitude": -140, "latitude": 0 },
                    { "name": "Indian Ocean", "longitude": 80, "latitude": -20 },
                    { "name": "Southern Ocean", "longitude": 0, "latitude": -65 },
                    { "name": "Arctic Ocean", "longitude": 0, "latitude": 72 }
                ]
            },
            "mark": {
                "type": "text",
                "fontSize": 14,
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
                    "calculate": "round(datum.Ground)",
                    "as": "ground"
                },
            ],
            "mark": {
                "type": "circle",
                "strokeWidth": 1,
                "opacity": 0.6,
            },
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
                    "bin": { "step": 100 },
                    "field": "Fatalities Total",
                    "type": "quantitative",
                    "scale": { "range": [20, 100] },
                    "legend": {
                        "title": "Total Fatalities",
                        "orient": "none",
                        "direction": "vertical",
                        "legendX": MAP_LEGEND_X,
                        "legendY": MAP_LEGEND_Y,
                        "labelFontSize": 12,
                        "titleFontSize": 14,
                    }
                },
                "stroke": {
                    "condition": {
                        "test": "yearFilter == 'All' || datum.Year == yearFilter",
                        "value": "#6d1d11ff"
                    },
                    "value": "trasparent"
                },
                "color": {
                    "condition": {
                        "test": "yearFilter == 'All' || datum.Year == yearFilter",
                        "value": "#cc3f29ff"
                    },
                    "value": "#bdbdbdff"
                },
                "tooltip": [
                    { "field": "Date" },
                    { "field": "Location" },
                    { "field": "Operator" },
                    { "field": "Route" },
                    { "field": "Aboard Total", "title": "Total Abroad" },
                    { "field": "Fatalities Total", "title": "Total Fatalities" },
                    { "field": "ground", "title": "Fatalities on Ground" },
                    { "field": "Summary" },
                ],
            },
        },
    ]
}