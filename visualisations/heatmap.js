import { HEATMAP_HEIGHT, HEATMAP_WIDTH } from './constants.js';

const heatmapLeft = {
    "transform": [
        {
            "filter": "datum.Side == 'Left'"
        }
    ],
    "facet": {
        "column": {
            "field": "RowSection",
            "sort": ["Front", "Middle", "Back"],
            "title": null,
            "header": {
                "labels": false,
            }
        },
    },
    "spacing": 50,
    "spec": {
        "width": HEATMAP_WIDTH,
        "height": HEATMAP_HEIGHT,
        "layer": [
            {
                "mark": {
                    "type": "rect",
                    "cornerRadius": 5
                },
                "encoding": {
                    "y": {
                        "field": "SeatType",
                        "type": "ordinal",
                        "axis": {
                            "labels": false,
                            "title": null,
                            "domain": false,
                            "grid": false,
                            "ticks": false
                        },
                        "sort": ["Aisle", "Middle", "Window"],
                    },
                    "x": {
                        "field": "RowNumberNum",
                        "type": "ordinal",
                        "axis": {
                            "labels": false,
                            "title": null,
                            "domain": false,
                            "grid": false,
                            "ticks": false
                        },
                    },
                    "color": {
                        "field": "SurvivalRateNum",
                        "type": "quantitative",
                        "scale": {
                            "scheme": "greens"
                        },
                        "legend": null
                    },
                    "tooltip": [
                        { "field": "RowSection", "title": "Section" },
                        { "field": "SeatType", "title": "Seat Type" },
                        { "field": "Side", "title": "Side" },
                        { "field": "SurvivalRateNum", "title": "Survival Rate (%)" }
                    ]
                }
            }
        ],

    },
};


const heatmapRight = {
    "transform": [
        {
            "filter": "datum.Side == 'Right'"
        }
    ],
    "facet": {
        "column": {
            "field": "RowSection",
            "sort": ["Front", "Middle", "Back"],
            "title": null,
            "header": {
                "labels": false,
            }
        },
    },
    "spacing": 50,
    "spec": {
        "width": HEATMAP_WIDTH,
        "height": HEATMAP_HEIGHT,
        "layer": [
            {
                "mark": {
                    "type": "rect",
                    "cornerRadius": 5
                },
                "encoding": {
                    "y": {
                        "field": "SeatType",
                        "type": "ordinal",
                        "axis": {
                            "labels": false,
                            "title": null,
                            "domain": false,
                            "grid": false,
                            "ticks": false
                        },
                        "sort": ["Window", "Middle", "Aisle"],
                    },
                    "x": {
                        "field": "RowNumberNum",
                        "type": "ordinal",
                        "axis": {
                            "labels": false,
                            "title": null,
                            "domain": false,
                            "grid": false,
                            "ticks": false
                        }
                    },
                    "color": {
                        "field": "SurvivalRateNum",
                        "type": "quantitative",
                        "scale": {
                            "scheme": "greens"
                        },
                        "legend": null
                    },
                    "tooltip": [
                        { "field": "RowSection", "title": "Section" },
                        { "field": "SeatType", "title": "Seat Type" },
                        { "field": "Side", "title": "Side" },
                        { "field": "SurvivalRateNum", "title": "Survival Rate (%)" }
                    ]
                }
            },
        ]
    },
};

export const heatmapSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
    "background": "transparent",
    "data": { "url": "https://raw.githubusercontent.com/ryanCYJ/Data-Visualisation/refs/heads/main/data/survival_rate.csv" },
    "transform": [
        {
            "calculate": "toNumber(datum.SurvivalRate)", "as": "SurvivalRateNum"
        },
        {
            "calculate": "toNumber(datum.RowNumber)", "as": "RowNumberNum"
        },
    ],
    "vconcat": [heatmapRight, heatmapLeft],
    "config": {
        "scale": {
            "bandPaddingInner": 0.1,
            "bandPaddingOuter": 0
        },
        "view": {
            "stroke": null
        }
    }
};