import { BAR_HEIGHT, BAR_WIDTH } from './constants.js';
import { BAR_LEGEND_X, BAR_LEGEND_Y } from './constants.js';

export const groupBarSpec = {
    "width": BAR_WIDTH,
    "height": BAR_HEIGHT,
    "title": {
        "text": "Comparsion of Total Aboard vs Fatalities",
        // "anchor": "start",
        // "baseline": "top",
        // "dx": 0,
        "dy": -24
    },
    "transform": [
        {
            "fold": [
                "Aboard Passengers",
                "Aboard Crew",
                "Fatalities Passengers",
                "Fatalities Crew"
            ],
            "as": ["category", "value"]
        },
        {
            "calculate": "round(datum.value)",
            "as": "value"
        },
        {
            "calculate": "if(indexof(datum.category, 'Passengers') >= 0, 'Passenger', 'Crew')",
            "as": "group"
        },
        {
            "calculate": "if(indexof(datum.category, 'Fatalities') >= 0, 'Total Fatalities', 'Total Aboard')",
            "as": "category"
        },
        {
            "calculate": "year(timeParse(datum.Date, '%B %d, %Y'))",
            "as": "Year"
        },
        {
            "filter": "yearFilter == 'All' || datum.Year == yearFilter"
        },
        {
            "aggregate": [
                { "op": "sum", "field": "value", "as": "total" }
            ],
            "groupby": ["category", "group"]
        }
    ],
    "mark": {
        "type": "bar",
        "size": 35
    },
    "encoding": {
        "x": {
            "field": "category",
            "type": "nominal",
            "title": "Category",
            "axis": { "labelAngle": 0 },
        },
        "xOffset": {
            "field": "group",
        },
        "y": {
            "field": "total",
            "type": "quantitative",
            "title": "Number of People",
        },
        "color": {
            "field": "group",
            "legend": {
                "title": "Role",
                "orient": "none",
                "direction": "vertical",
                "legendX": BAR_LEGEND_X,
                "legendY": BAR_LEGEND_Y,
            }

        },
        "tooltip": [
            {
                "field": "group", "title": "Role"
            },
            {
                "field": "total", "title": "Number of People"
            }
        ]
    }
}