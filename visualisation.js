import { mapSpec } from './visualisations/map.js';
import { lineSpec } from './visualisations/lineChart.js';
import { barSpec1 } from './visualisations/barChart1.js';
import { barSpec2 } from './visualisations/barChart2.js';
import { heatmapSpec } from './visualisations/heatmap.js';
import { groupBarSpec } from './visualisations/groupedBarChart.js';
import { PARAM_OPTIONS } from './visualisations/constants.js';

const combine_bar = {
    "resolve": {
        "legend": {
            "color": "independent",
            "size": "independent"
        }
    },
    "spacing": 30,
    "hconcat": [
        barSpec1,
        barSpec2,
        groupBarSpec,
    ],
}

const combine_map_bar = {
    "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
    "data": { "url": "https://raw.githubusercontent.com/ryanCYJ/Data-Visualisation/refs/heads/main/data/plane_crashes_2000_2025.csv" },
    "params": [
        {
            "name": "yearFilter",
            "value": "All",
            "bind": {
                "input": "radio",
                "options": PARAM_OPTIONS,
                "name": "Select Year"
            }
        }
    ],
    "resolve": {
        "legend": {
            "color": "independent",
            "size": "independent"
        }
    },
    "background": "transparent",
    "vconcat": [
        mapSpec,
        combine_bar
    ],
    "center": true
}

vegaEmbed('#vis-bar', combine_map_bar);
vegaEmbed('#vis-line', lineSpec);
vegaEmbed('#vis-heatmap', heatmapSpec);