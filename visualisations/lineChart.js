import { LINE_HEIGHT, LINE_WIDTH } from './constants.js';

export const lineSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
    "width": LINE_WIDTH,
    "height": LINE_HEIGHT,
    "title": "Annual Plane Crashes and 5 Year Trend",
    "background": "transparent",
    "data": {
        "url": "https://raw.githubusercontent.com/ryanCYJ/Data-Visualisation/refs/heads/main/data/plane_crashes_2000_2025.csv"
    },
    "transform": [
        {
            "timeUnit": "year",
            "field": "Date",
            "as": "year"
        },
        {
            "aggregate": [
                { "op": "count", "as": "crash_no" }
            ],
            "groupby": ["year"]
        },
        {
            "window": [
                { "op": "mean", "field": "crash_no", "as": "rolling_mean" }
            ],
            "frame": [-2, 2] // 5 year rolling average
        },
        {
            "calculate": "round(datum.rolling_mean * 100) / 100",
            "as": "rolling_mean_2dp"
        }
    ],
    "encoding": {
        "x": {
            "timeUnit": "year",
            "field": "year",
            "type": "ordinal",
            "title": "Year",
            "axis": {
                "labelAngle": -90
            }
        },
        "tooltip": [
            {
                "field": "year", "title": "Year", "type": "temporal", "format": "%Y"

            },
            {
                "field": "crash_no", "title": "Number of Crashes"
            },
            {
                "field": "rolling_mean_2dp", "title": "Rolling Mean"
            }
        ]
    },
    "layer": [
        {
            "mark": "bar",
            "encoding": {
                "y": {
                    "field": "crash_no",
                    "type": "quantitative",
                    "title": "Number of Crashes"
                },
            }
        },
        {
            "mark": {
                "type": "line",
                "color": "red",
                "size": 3,
                "point": {
                    "filled": true,
                    "size": 50,
                    "color": "red"
                }
            },
            "encoding": {
                "y": {
                    "field": "rolling_mean",
                    "type": "quantitative",
                    "title": "5 Year Rolling Mean"
                },
            }
        }
    ]
}