const mapSpec = {
    "width": 1400,
    "height": 600,
    "title": "Airplane Crashes from 2000 to 2025",
    "projection": {
        "type": "naturalEarth1",
    },
    "layer": [
        {
            "data": {
                "url": "data/ne_50m_ocean.json",
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
                "url": "data/ne_110m_admin_0_countries.json",
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
            "data": {
                "url": "data/plane_crashes_2000_2025.csv"
            },
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
                    "legend": { "title": "Total Number of Fatalities" }
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

const barSpec = {
    "width": 500,
    "height": 500,
    "title": "Top 10 Number of Crashes by Operator",
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
                        "size": 25,
                        "yOffset": 5,
                        "color": "#F08787",
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
                        "dy": -15,
                        "zindex": 999,
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
                        "color": "#aaaaaa"
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
                        "dy": -15,
                        "size": 10,
                        "color": "#aaaaaa"
                    },
                    "encoding": {
                        "y": { "value": 0 },
                        "x": {
                            "aggregate": "mean",
                            "field": "crash_no",
                            "type": "quantitative",
                        },
                        "text": { "value": "Average Number of Crashes per Operator" },
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

const barSpec2 = {
    "width": 500,
    "height": 500,
    "title": "Top 10 Number of Crashes by Airplane Type",
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
                "size": 25,
                "yOffset": 5,
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
                "dy": -15,
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

const groupBarSpec = {
    "width": 300,
    "height": 500,
    "title": "Comparsion of Total Aboard vs Fatalities",
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
            "field": "value",
            "type": "quantitative",
            "title": "Number of People"
        },
        "color": {
            "field": "group",
            "legend": { "title": "Role" }

        }
    }
}

const lineSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
    "width": 1200,
    "height": 100,
    "background": "transparent",
    "description": "Number of Airplane Crashes Over Time",
    "data": {
        "url": "data/plane_crashes_2000_2025.csv"
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

const heatmapSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
    "background": "transparent",
    "data": { "url": "data/survival_rate.csv" },
    "transform": [
        {
            "calculate": "toNumber(datum.SurvivalRate)", "as": "SurvivalRateNum"
        },
        {
            "calculate": "toNumber(datum.RowNumber)", "as": "RowNumberNum"
        },
        // {
        //   "calculate":
        //     "datum.Side === 'Left' ? (datum.SeatType === 'Window' ? 0 : datum.SeatType === 'Middle' ? 1 : 2) : (datum.SeatType === 'Aisle' ? 0 : datum.SeatType === 'Middle' ? 1 : 2)",
        //   "as": "SeatOrder"
        // }
    ],
    "facet": {

        "row": {
            "field": "Side",
            "sort": ["Left", "Right"],
            "title": "Side"
        },
        "column": {
            "field": "RowSection",
            "sort": ["Front", "Middle", "Back"],
            "title": "Section"
        },
    },
    "spec": {
        "width": 300,
        "height": 150,
        "mark": {
            "type": "rect",
            "cornerRadius": 5
        },
        "encoding": {
            "y": {
                "field": "SeatType",
                "type": "ordinal",
                "axis": { "title": "Seat Type" },
                "sort": { "field": "SeatOrder" }
            },
            "x": {
                "field": "RowNumberNum",
                "type": "ordinal",
                "axis": { "title": "Row" }
            },
            "color": {
                "field": "SurvivalRateNum",
                "type": "quantitative",
                "scale": { "scheme": "greens" }
            },
            "tooltip": [
                { "field": "RowSection", "title": "Section" },
                { "field": "RowNumber", "title": "Row" },
                { "field": "SeatType", "title": "Seat Type" },
                { "field": "Side", "title": "Side" },
                { "field": "SurvivalRateNum", "title": "Survival Rate" }
            ]
        }
    },
    "config": { "scale": { "bandPaddingInner": 0.2, "bandPaddingOuter": 0.05 } }
};


const combine_bar = {
    "hconcat": [
        barSpec,
        barSpec2,
        groupBarSpec,
    ],
}

const combine_map_bar = {
    "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
    "data": { "url": "data/plane_crashes_2000_2025.csv" },
    "params": [
        {
            "name": "yearFilter",
            "value": "All",
            "bind": {
                "input": "radio",
                "options": ["All", 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
                "name": "Year"
            }
        }
    ],
    "resolve": {
        "legend": {
            "color": "independent",
            "size": "independent"
        }
    },
    "spacing": 50,
    "background": "transparent",
    "vconcat": [
        mapSpec,
        combine_bar
    ]
}

vegaEmbed('#vis-bar', combine_map_bar);
vegaEmbed('#vis-line', lineSpec);
vegaEmbed('#vis-heatmap', heatmapSpec);