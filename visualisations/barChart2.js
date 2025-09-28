import { BAR_HEIGHT, BAR_WIDTH, BAR_SIZE } from './constants.js';

export const barSpec2 = {
    "width": BAR_WIDTH,
    "height": BAR_HEIGHT,
    "title": {
        "text": "Top 10 Number of Crashes by Airplane Type",
        // "anchor": "start",
        // "baseline": "top",
        // "dx": 0,
        "dy": -24
    },
    "transform": [
        {
            "calculate": "year(timeParse(datum.Date, '%B %d, %Y'))",
            "as": "Year"
        },
        {
            "filter": "yearFilter == 'All' || datum.Year == yearFilter"
        },
        {
            "aggregate": [{
                "op": "count",
                "field": "AC Type",
                "as": "crash_no"
            }],
            "groupby": ["AC Type"]
        },
        {
            "window": [{ "op": "row_number", "as": "rank" }],
            "sort": [{ "field": "crash_no", "order": "descending" }],
        },
        {
            "filter": "datum.rank <= 10"
        },
    ],
    "encoding": {
        "y": {
            "field": "AC Type",
            "type": "nominal",
            "title": "Airplane Type",
            "sort": "-x",
            "axis": {
                "labelAngle": -45,
                "labels": false
            }
        },
        "x": {
            "field": "crash_no",
            "type": "quantitative",
            "title": "Number of Crashes"
        }
    },
    "layer": [
        {
            "mark": {
                "type": "bar",
                "size": BAR_SIZE,
                "yOffset": 1,
                "color": "#F08787",
            },
            "encoding": {
                "tooltip": [
                    { "field": "AC Type", "title": "Airplane Type" },
                    { "field": "crash_no", "title": "Crashes" },
                ]
            }
        },
        {
            "mark": {
                "type": "text",
                "align": "left",
                "baseline": "middle",
                "dx": 3,
                // "dy": -15,
            },
            "encoding": {
                "x": {
                    "datum": 0
                },
                "text": { "field": "AC Type" }
            }
        },
    ]

}