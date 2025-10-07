// vis.js — Vega-Lite visualizations for video game sales
document.addEventListener("DOMContentLoaded", () => {
  if (typeof vegaEmbed !== "function") return;

  renderGenrePlatformHeatmap();
  renderSalesOverTime();
  renderRegionalStackedBars();
  renderJapanStory();
});

const DATA_URL = "videogames_wide.csv";
const PRIMARY_PLATFORMS = ["PS2", "X360", "PS3", "Wii", "DS", "PS", "GBA", "PSP"];
const TOP_PLATFORMS_FOR_TRENDS = ["PS2", "PS3", "X360", "Wii", "DS"];
const TOP_GENRES_FOR_TRENDS = ["Action", "Shooter", "Sports", "Role-Playing"];
const TOP_PLATFORM_ORDER = ["PS2", "X360", "PS3", "Wii", "DS", "PS", "3DS", "GBA", "PSP", "PS4", "PC"];

function renderGenrePlatformHeatmap() {
  const target = "#viz-genre-platform";
  if (!document.querySelector(target)) return;

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { url: DATA_URL },
    transform: [
      { filter: { field: "Platform", oneOf: PRIMARY_PLATFORMS } },
      { aggregate: [{ op: "sum", field: "Global_Sales", as: "GlobalSales" }], groupby: ["Genre", "Platform"] },
    ],
    mark: { type: "rect", tooltip: true },
    encoding: {
      x: { field: "Platform", type: "nominal", sort: PRIMARY_PLATFORMS, title: "Platform" },
      y: { field: "Genre", type: "nominal", title: "Genre" },
      color: {
        field: "GlobalSales",
        type: "quantitative",
        title: "Global Sales (M units)",
        scale: { scheme: "blues" },
      },
      tooltip: [
        { field: "Genre", title: "Genre" },
        { field: "Platform", title: "Platform" },
        { field: "GlobalSales", title: "Global Sales (M)", format: ".2f" },
      ],
    },
    config: {
      view: { stroke: "transparent" },
      axis: { labelFontSize: 12, titleFontSize: 13 },
    },
  };

  vegaEmbed(target, spec, { actions: false, renderer: "canvas" }).catch((err) => console.error(err));
}

function renderSalesOverTime() {
  const target = "#viz-time-series";
  if (!document.querySelector(target)) return;

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { url: DATA_URL },
    transform: [
      { filter: { field: "Platform", oneOf: TOP_PLATFORMS_FOR_TRENDS } },
      { filter: { field: "Genre", oneOf: TOP_GENRES_FOR_TRENDS } },
      { filter: "isValid(datum.Year)" },
      {
        aggregate: [{ op: "sum", field: "Global_Sales", as: "GlobalSales" }],
        groupby: ["Year", "Platform", "Genre"],
      },
    ],
    facet: {
      row: {
        field: "Genre",
        type: "nominal",
        sort: TOP_GENRES_FOR_TRENDS,
        header: { labelFontSize: 13, title: null },
      },
    },
    spec: {
      width: 240,
      height: 120,
      mark: { type: "line", point: { filled: false, size: 40 }, interpolate: "monotone" },
      encoding: {
        x: {
          field: "Year",
          type: "quantitative",
          title: "Release year",
          scale: { nice: false, domain: [1995, 2017] },
        },
        y: {
          field: "GlobalSales",
          type: "quantitative",
          title: "Global sales (M)",
        },
        color: {
          field: "Platform",
          type: "nominal",
          sort: TOP_PLATFORMS_FOR_TRENDS,
          title: "Platform",
          legend: { orient: "bottom", columns: 3, labelFontSize: 12 },
        },
        tooltip: [
          { field: "Year", type: "quantitative", title: "Year" },
          { field: "Genre", title: "Genre" },
          { field: "Platform", title: "Platform" },
          { field: "GlobalSales", title: "Global Sales (M)", format: ".2f" },
        ],
      },
    },
    resolve: { scale: { y: "independent" } },
    config: {
      facet: { spacing: 20 },
      axis: { labelFontSize: 11, titleFontSize: 12 },
    },
  };

  vegaEmbed(target, spec, { actions: false, renderer: "canvas" }).catch((err) => console.error(err));
}

function renderRegionalStackedBars() {
  const target = "#viz-regional";
  if (!document.querySelector(target)) return;

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { url: DATA_URL },
    transform: [
      { filter: { field: "Platform", oneOf: TOP_PLATFORM_ORDER } },
      {
        fold: ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"],
        as: ["Region", "Sales"],
      },
      {
        aggregate: [{ op: "sum", field: "Sales", as: "TotalSales" }],
        groupby: ["Platform", "Region"],
      },
      {
        calculate: "replace(datum.Region, '_Sales', '')",
        as: "RegionDisplay",
      },
    ],
    mark: { type: "bar", tooltip: true },
    encoding: {
      x: {
        field: "Platform",
        type: "nominal",
        sort: TOP_PLATFORM_ORDER,
        title: "Platform",
      },
      y: {
        field: "TotalSales",
        type: "quantitative",
        title: "Units sold (M)",
      },
      color: {
        field: "RegionDisplay",
        type: "nominal",
        title: "Region",
        scale: {
          domain: ["NA", "EU", "JP", "Other"],
          range: ["#1f77b4", "#ff7f0e", "#2ca02c", "#9467bd"],
        },
      },
      tooltip: [
        { field: "Platform", title: "Platform" },
        { field: "RegionDisplay", title: "Region" },
        { field: "TotalSales", title: "Sales (M)", format: ".2f" },
      ],
    },
    config: {
      axis: { labelFontSize: 12, titleFontSize: 13 },
      view: { stroke: "transparent" },
    },
  };

  vegaEmbed(target, spec, { actions: false, renderer: "canvas" }).catch((err) => console.error(err));
}

function renderJapanStory() {
  const target = "#viz-story";
  if (!document.querySelector(target)) return;

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { url: DATA_URL },
    transform: [
      {
        aggregate: [
          { op: "sum", field: "Global_Sales", as: "GlobalSales" },
          { op: "sum", field: "JP_Sales", as: "JapanSales" },
        ],
        groupby: ["Genre"],
      },
      {
        calculate: "datum.JapanSales / datum.GlobalSales",
        as: "JapanShare",
      },
    ],
    mark: {
      type: "point",
      filled: true,
      size: 200,
      opacity: 0.9,
    },
    encoding: {
      x: {
        field: "GlobalSales",
        type: "quantitative",
        title: "Global sales (M units)",
      },
      y: {
        field: "JapanShare",
        type: "quantitative",
        title: "Share of sales in Japan",
        axis: { format: ".0%" },
      },
      color: {
        field: "Genre",
        type: "nominal",
        title: "Genre",
      },
      size: {
        field: "GlobalSales",
        type: "quantitative",
        title: "Global sales (M)",
        scale: { range: [80, 600] },
      },
      tooltip: [
        { field: "Genre", title: "Genre" },
        { field: "GlobalSales", title: "Global Sales (M)", format: ".1f" },
        { field: "JapanSales", title: "Japan Sales (M)", format: ".1f" },
        { field: "JapanShare", title: "Japan Share", format: ".0%" },
      ],
    },
    config: {
      axis: { labelFontSize: 12, titleFontSize: 13 },
      view: { stroke: "transparent" },
      legend: { labelFontSize: 12, titleFontSize: 13 },
    },
  };

  vegaEmbed(target, spec, { actions: false, renderer: "canvas" }).catch((err) => console.error(err));
}
