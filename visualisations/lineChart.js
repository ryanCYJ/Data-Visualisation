import { LINE_HEIGHT, LINE_WIDTH } from './constants.js';

export const lineSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
    "width": LINE_WIDTH,
    "height": LINE_HEIGHT,
    "background": "transparent",
    "title": "Number of Airplane Crashes Over Time",
    "data": {
        "url": "https://raw.githubusercontent.com/ryanCYJ/Data-Visualisation/refs/heads/main/data/plane_crashes_2000_2025.csv"
    },
    "mark": "line",
    "encoding": {
        "x": {
            "timeUnit": "year",
            "field": "Date",
            "type": "temporal",
            "title": "Year",
        },
        "y": {
            "aggregate": "count",
            "type": "quantitative",
            "title": "Number of Crashes",
        }
    }
}