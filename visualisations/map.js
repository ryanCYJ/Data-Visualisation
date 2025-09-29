import { MAP_HEIGHT, MAP_WIDTH, MAP_LEGEND_X, MAP_LEGEND_Y } from './constants.js';

const deadliestCrashAnnotation = {
    "layer": [
        // --- Annotation line (rule) ---
        {
            "mark": { "type": "rule", "color": "red", "strokeWidth": 1 },
            "encoding": {
                "x": { "value": 38.648265 },  // text x position
                "y": { "value": 48.148266 },       // text y position
                "x2": { "value": -73.78 }, // point x position
                "y2": { "value": 40.64 }   // point y position
            }
        },
        // --- Annotation text ---
        {
            "mark": { "type": "text", "align": "left", "baseline": "middle", "dx": 5, "dy": 0, "fontSize": 14, "fontWeight": "bold", "color": "red" },
            "encoding": {
                "longitude": { "value": 38.648265 },
                "latitude": { "value": 48.148266 },
                "text": { "value": "Deadliest Crash" }
            }
        }
    ]
}

export const mapSpec = {
    "width": MAP_WIDTH,
    "height": MAP_HEIGHT,
    "title": {
        "text": "Location of Plane Crashes",
        "fontSize": 20,
    },
    "projection": {
        "type": "equirectangular",
    },
    "layer": [
        // {
        //     "data": {
        //         "url": "https://raw.githubusercontent.com/ryanCYJ/Data-Visualisation/refs/heads/main/data/ne_50m_ocean.json",
        //         "format": {
        //             "type": "topojson",
        //             "feature": "ne_50m_ocean"
        //         }
        //     },
        //     "mark": {
        //         "type": "geoshape",
        //         "fill": "#91C8E4",
        //     },
        // },
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
                    "filter": "yearFilter == 'All' || datum.Year == yearFilter"
                },
                {
                    "calculate": "round(datum.Ground)",
                    "as": "ground"
                },
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
                        "labelFontSize": 12,
                        "titleFontSize": 14
                    }
                },
                "color": { "value": "#DC3C22" },
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