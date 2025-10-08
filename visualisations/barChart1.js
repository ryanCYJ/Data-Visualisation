import { BAR_HEIGHT, BAR_WIDTH, BAR_SIZE } from './constants.js';

const REFERENCE_LINE_DESC = ["Average Crashes", "per Operator"];

export const barSpec1 = {
    "width": BAR_WIDTH,
    "height": BAR_HEIGHT,
    "title": {
        "text": "Top 10 Number of Crashes by Operator",
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
            "aggregate": [
                { "op": "count", "field": "Operator", "as": "crash_no" }
            ],
            "groupby": ["Operator"]
        },
    ],
    "layer": [
        {
            "transform": [
                {
                    "window": [{ "op": "row_number", "as": "rank" }],
                    "sort": [{ "field": "crash_no", "order": "descending" }],
                },
                {
                    "filter": "datum.rank <= 10"
                },
                {
                    "calculate": "max(datum.value, 5)",
                    "as": "xMax"
                }
            ],
            "encoding": {
                "y": {
                    "field": "Operator",
                    "type": "nominal",
                    "sort": "-x",
                    "axis": {
                        "labelAngle": -90,
                        "labels": false
                    }
                },
                "x": {
                    "field": "crash_no",
                    "type": "quantitative",
                    "title": "Number of Crashes",
                }
            },
            "layer": [
                {
                    "mark": {
                        "type": "bar",
                        "size": BAR_SIZE,
                        "yOffset": 1,
                        "color": "#b0c1f0ff",
                    },
                    "encoding": {
                        "tooltip": [
                            { "field": "Operator" },
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
                    },
                    "encoding": {
                        "x": {
                            "datum": 0
                        },
                        "text": { "field": "Operator" }
                    }

                },
            ]
        },
        {
            "layer": [
                {
                    "mark": {
                        "type": "rule",
                        "strokeWidth": 1,
                        "strokeDash": [8, 8],
                        "color": "#525252ff"
                    },
                    "encoding": {
                        "x": {
                            "aggregate": "mean",
                            "field": "crash_no",
                            "type": "quantitative",
                        },
                    }
                },
                {
                    "mark": {
                        "type": "text",
                        "dx": 0,
                        "dy": -20,
                        "size": 9,
                        "color": "#525252ff"
                    },
                    "encoding": {
                        "y": { "value": 0 },
                        "x": {
                            "aggregate": "mean",
                            "field": "crash_no",
                            "type": "quantitative",
                        },
                        "text": { "value": REFERENCE_LINE_DESC },
                        "tooltip": [
                            {
                                "aggregate": "mean",
                                "field": "crash_no",
                                "title": "Average number of crashes per Operator"
                            }
                        ]
                    }
                }
            ]

        }
    ]
};