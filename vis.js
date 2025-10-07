// vis.js — Vega-Lite visualizations for video game sales
document.addEventListener("DOMContentLoaded", () => {
  if (typeof vegaEmbed !== "function") return;

  renderGenrePlatformHeatmap();
  renderSalesOverTime();
  renderRegionalStackedBars();
  renderJapanStory();
});

const CHART_OPTIONS = { actions: false, renderer: "canvas" };
const PRIMARY_PLATFORMS = ["PS2", "X360", "PS3", "Wii", "DS", "PS", "GBA", "PSP"];
const TOP_PLATFORMS_FOR_TRENDS = ["PS2", "PS3", "X360", "Wii", "DS"];
const TOP_GENRES_FOR_TRENDS = ["Action", "Shooter", "Sports", "Role-Playing"];
const TOP_PLATFORM_ORDER = ["PS2", "X360", "PS3", "Wii", "DS", "PS", "3DS", "GBA", "PSP", "PS4", "PC"];
const REGION_ORDER = ["NA", "EU", "JP", "Other"];

const VG_DATA = {
  "heatmap": [
    {
      "Genre": "Action",
      "Platform": "DS",
      "GlobalSales": 115.56
    },
    {
      "Genre": "Action",
      "Platform": "GBA",
      "GlobalSales": 55.76
    },
    {
      "Genre": "Action",
      "Platform": "PS",
      "GlobalSales": 127.05
    },
    {
      "Genre": "Action",
      "Platform": "PS2",
      "GlobalSales": 272.76
    },
    {
      "Genre": "Action",
      "Platform": "PS3",
      "GlobalSales": 307.88
    },
    {
      "Genre": "Action",
      "Platform": "PSP",
      "GlobalSales": 64.72
    },
    {
      "Genre": "Action",
      "Platform": "Wii",
      "GlobalSales": 118.58
    },
    {
      "Genre": "Action",
      "Platform": "X360",
      "GlobalSales": 242.67
    },
    {
      "Genre": "Adventure",
      "Platform": "DS",
      "GlobalSales": 47.29
    },
    {
      "Genre": "Adventure",
      "Platform": "GBA",
      "GlobalSales": 14.68
    },
    {
      "Genre": "Adventure",
      "Platform": "PS",
      "GlobalSales": 20.97
    },
    {
      "Genre": "Adventure",
      "Platform": "PS2",
      "GlobalSales": 21.16
    },
    {
      "Genre": "Adventure",
      "Platform": "PS3",
      "GlobalSales": 22.9
    },
    {
      "Genre": "Adventure",
      "Platform": "PSP",
      "GlobalSales": 10.69
    },
    {
      "Genre": "Adventure",
      "Platform": "Wii",
      "GlobalSales": 18.43
    },
    {
      "Genre": "Adventure",
      "Platform": "X360",
      "GlobalSales": 15.23
    },
    {
      "Genre": "Fighting",
      "Platform": "DS",
      "GlobalSales": 7.2
    },
    {
      "Genre": "Fighting",
      "Platform": "GBA",
      "GlobalSales": 4.21
    },
    {
      "Genre": "Fighting",
      "Platform": "PS",
      "GlobalSales": 72.68
    },
    {
      "Genre": "Fighting",
      "Platform": "PS2",
      "GlobalSales": 92.6
    },
    {
      "Genre": "Fighting",
      "Platform": "PS3",
      "GlobalSales": 51.7
    },
    {
      "Genre": "Fighting",
      "Platform": "PSP",
      "GlobalSales": 21.97
    },
    {
      "Genre": "Fighting",
      "Platform": "Wii",
      "GlobalSales": 23.86
    },
    {
      "Genre": "Fighting",
      "Platform": "X360",
      "GlobalSales": 37.64
    },
    {
      "Genre": "Misc",
      "Platform": "DS",
      "GlobalSales": 137.76
    },
    {
      "Genre": "Misc",
      "Platform": "GBA",
      "GlobalSales": 36.25
    },
    {
      "Genre": "Misc",
      "Platform": "PS",
      "GlobalSales": 44.9
    },
    {
      "Genre": "Misc",
      "Platform": "PS2",
      "GlobalSales": 101.14
    },
    {
      "Genre": "Misc",
      "Platform": "PS3",
      "GlobalSales": 47.85
    },
    {
      "Genre": "Misc",
      "Platform": "PSP",
      "GlobalSales": 13.96
    },
    {
      "Genre": "Misc",
      "Platform": "Wii",
      "GlobalSales": 221.06
    },
    {
      "Genre": "Misc",
      "Platform": "X360",
      "GlobalSales": 91.96
    },
    {
      "Genre": "Platform",
      "Platform": "DS",
      "GlobalSales": 77.45
    },
    {
      "Genre": "Platform",
      "Platform": "GBA",
      "GlobalSales": 78.3
    },
    {
      "Genre": "Platform",
      "Platform": "PS",
      "GlobalSales": 64.21
    },
    {
      "Genre": "Platform",
      "Platform": "PS2",
      "GlobalSales": 72.51
    },
    {
      "Genre": "Platform",
      "Platform": "PS3",
      "GlobalSales": 30.33
    },
    {
      "Genre": "Platform",
      "Platform": "PSP",
      "GlobalSales": 17.28
    },
    {
      "Genre": "Platform",
      "Platform": "Wii",
      "GlobalSales": 90.74
    },
    {
      "Genre": "Platform",
      "Platform": "X360",
      "GlobalSales": 11.39
    },
    {
      "Genre": "Puzzle",
      "Platform": "DS",
      "GlobalSales": 84.29
    },
    {
      "Genre": "Puzzle",
      "Platform": "GBA",
      "GlobalSales": 12.92
    },
    {
      "Genre": "Puzzle",
      "Platform": "PS",
      "GlobalSales": 12.08
    },
    {
      "Genre": "Puzzle",
      "Platform": "PS2",
      "GlobalSales": 5.9
    },
    {
      "Genre": "Puzzle",
      "Platform": "PS3",
      "GlobalSales": 0.6
    },
    {
      "Genre": "Puzzle",
      "Platform": "PSP",
      "GlobalSales": 5.5200000000000005
    },
    {
      "Genre": "Puzzle",
      "Platform": "Wii",
      "GlobalSales": 15.67
    },
    {
      "Genre": "Puzzle",
      "Platform": "X360",
      "GlobalSales": 0.85
    },
    {
      "Genre": "Racing",
      "Platform": "DS",
      "GlobalSales": 38.64
    },
    {
      "Genre": "Racing",
      "Platform": "GBA",
      "GlobalSales": 18.8
    },
    {
      "Genre": "Racing",
      "Platform": "PS",
      "GlobalSales": 103.19
    },
    {
      "Genre": "Racing",
      "Platform": "PS2",
      "GlobalSales": 156.28
    },
    {
      "Genre": "Racing",
      "Platform": "PS3",
      "GlobalSales": 73.95
    },
    {
      "Genre": "Racing",
      "Platform": "PSP",
      "GlobalSales": 34.73
    },
    {
      "Genre": "Racing",
      "Platform": "Wii",
      "GlobalSales": 61.28
    },
    {
      "Genre": "Racing",
      "Platform": "X360",
      "GlobalSales": 65.99
    },
    {
      "Genre": "Role-Playing",
      "Platform": "DS",
      "GlobalSales": 126.85
    },
    {
      "Genre": "Role-Playing",
      "Platform": "GBA",
      "GlobalSales": 64.21
    },
    {
      "Genre": "Role-Playing",
      "Platform": "PS",
      "GlobalSales": 78.3
    },
    {
      "Genre": "Role-Playing",
      "Platform": "PS2",
      "GlobalSales": 93.5
    },
    {
      "Genre": "Role-Playing",
      "Platform": "PS3",
      "GlobalSales": 75.3
    },
    {
      "Genre": "Role-Playing",
      "Platform": "PSP",
      "GlobalSales": 49.05
    },
    {
      "Genre": "Role-Playing",
      "Platform": "Wii",
      "GlobalSales": 14.06
    },
    {
      "Genre": "Role-Playing",
      "Platform": "X360",
      "GlobalSales": 71.98
    },
    {
      "Genre": "Shooter",
      "Platform": "DS",
      "GlobalSales": 8.2
    },
    {
      "Genre": "Shooter",
      "Platform": "GBA",
      "GlobalSales": 3.6
    },
    {
      "Genre": "Shooter",
      "Platform": "PS",
      "GlobalSales": 39.31
    },
    {
      "Genre": "Shooter",
      "Platform": "PS2",
      "GlobalSales": 108.57
    },
    {
      "Genre": "Shooter",
      "Platform": "PS3",
      "GlobalSales": 196.04
    },
    {
      "Genre": "Shooter",
      "Platform": "PSP",
      "GlobalSales": 19.77
    },
    {
      "Genre": "Shooter",
      "Platform": "Wii",
      "GlobalSales": 28.77
    },
    {
      "Genre": "Shooter",
      "Platform": "X360",
      "GlobalSales": 278.55
    },
    {
      "Genre": "Simulation",
      "Platform": "DS",
      "GlobalSales": 132.03
    },
    {
      "Genre": "Simulation",
      "Platform": "GBA",
      "GlobalSales": 5.91
    },
    {
      "Genre": "Simulation",
      "Platform": "PS",
      "GlobalSales": 25.330000000000002
    },
    {
      "Genre": "Simulation",
      "Platform": "PS2",
      "GlobalSales": 42.66
    },
    {
      "Genre": "Simulation",
      "Platform": "PS3",
      "GlobalSales": 10.790000000000001
    },
    {
      "Genre": "Simulation",
      "Platform": "PSP",
      "GlobalSales": 6.28
    },
    {
      "Genre": "Simulation",
      "Platform": "Wii",
      "GlobalSales": 36.97
    },
    {
      "Genre": "Simulation",
      "Platform": "X360",
      "GlobalSales": 14.45
    },
    {
      "Genre": "Sports",
      "Platform": "DS",
      "GlobalSales": 31.83
    },
    {
      "Genre": "Sports",
      "Platform": "GBA",
      "GlobalSales": 16.41
    },
    {
      "Genre": "Sports",
      "Platform": "PS",
      "GlobalSales": 120.97
    },
    {
      "Genre": "Sports",
      "Platform": "PS2",
      "GlobalSales": 273.41
    },
    {
      "Genre": "Sports",
      "Platform": "PS3",
      "GlobalSales": 135.56
    },
    {
      "Genre": "Sports",
      "Platform": "PSP",
      "GlobalSales": 41.69
    },
    {
      "Genre": "Sports",
      "Platform": "Wii",
      "GlobalSales": 292.06
    },
    {
      "Genre": "Sports",
      "Platform": "X360",
      "GlobalSales": 139.12
    },
    {
      "Genre": "Strategy",
      "Platform": "DS",
      "GlobalSales": 15.39
    },
    {
      "Genre": "Strategy",
      "Platform": "GBA",
      "GlobalSales": 7.45
    },
    {
      "Genre": "Strategy",
      "Platform": "PS",
      "GlobalSales": 21.67
    },
    {
      "Genre": "Strategy",
      "Platform": "PS2",
      "GlobalSales": 15.15
    },
    {
      "Genre": "Strategy",
      "Platform": "PS3",
      "GlobalSales": 4.94
    },
    {
      "Genre": "Strategy",
      "Platform": "PSP",
      "GlobalSales": 10.620000000000001
    },
    {
      "Genre": "Strategy",
      "Platform": "Wii",
      "GlobalSales": 5.23
    },
    {
      "Genre": "Strategy",
      "Platform": "X360",
      "GlobalSales": 10.13
    }
  ],
  "trend": [
    {
      "Year": 1985,
      "Platform": "DS",
      "Genre": "Action",
      "GlobalSales": 0.02
    },
    {
      "Year": 2000,
      "Platform": "PS2",
      "Genre": "Action",
      "GlobalSales": 3.39
    },
    {
      "Year": 2001,
      "Platform": "PS2",
      "Genre": "Action",
      "GlobalSales": 35.06
    },
    {
      "Year": 2002,
      "Platform": "PS2",
      "Genre": "Action",
      "GlobalSales": 46.66
    },
    {
      "Year": 2003,
      "Platform": "PS2",
      "Genre": "Action",
      "GlobalSales": 40.32
    },
    {
      "Year": 2004,
      "Platform": "DS",
      "Genre": "Action",
      "GlobalSales": 0.5
    },
    {
      "Year": 2004,
      "Platform": "PS2",
      "Genre": "Action",
      "GlobalSales": 49.4
    },
    {
      "Year": 2005,
      "Platform": "DS",
      "Genre": "Action",
      "GlobalSales": 3.21
    },
    {
      "Year": 2005,
      "Platform": "PS2",
      "Genre": "Action",
      "GlobalSales": 42.74
    },
    {
      "Year": 2005,
      "Platform": "X360",
      "Genre": "Action",
      "GlobalSales": 1.26
    },
    {
      "Year": 2006,
      "Platform": "DS",
      "Genre": "Action",
      "GlobalSales": 9.48
    },
    {
      "Year": 2006,
      "Platform": "PS2",
      "Genre": "Action",
      "GlobalSales": 20.27
    },
    {
      "Year": 2006,
      "Platform": "PS3",
      "Genre": "Action",
      "GlobalSales": 0.92
    },
    {
      "Year": 2006,
      "Platform": "Wii",
      "Genre": "Action",
      "GlobalSales": 8.35
    },
    {
      "Year": 2006,
      "Platform": "X360",
      "Genre": "Action",
      "GlobalSales": 8.77
    },
    {
      "Year": 2007,
      "Platform": "DS",
      "Genre": "Action",
      "GlobalSales": 27.03
    },
    {
      "Year": 2007,
      "Platform": "PS2",
      "Genre": "Action",
      "GlobalSales": 17.01
    },
    {
      "Year": 2007,
      "Platform": "PS3",
      "Genre": "Action",
      "GlobalSales": 17.12
    },
    {
      "Year": 2007,
      "Platform": "Wii",
      "Genre": "Action",
      "GlobalSales": 22.23
    },
    {
      "Year": 2007,
      "Platform": "X360",
      "Genre": "Action",
      "GlobalSales": 11.09
    },
    {
      "Year": 2008,
      "Platform": "DS",
      "Genre": "Action",
      "GlobalSales": 17.07
    },
    {
      "Year": 2008,
      "Platform": "PS2",
      "Genre": "Action",
      "GlobalSales": 11.51
    },
    {
      "Year": 2008,
      "Platform": "PS3",
      "Genre": "Action",
      "GlobalSales": 38.14
    },
    {
      "Year": 2008,
      "Platform": "Wii",
      "Genre": "Action",
      "GlobalSales": 15.89
    },
    {
      "Year": 2008,
      "Platform": "X360",
      "Genre": "Action",
      "GlobalSales": 43.61
    },
    {
      "Year": 2009,
      "Platform": "DS",
      "Genre": "Action",
      "GlobalSales": 32.82
    },
    {
      "Year": 2009,
      "Platform": "PS2",
      "Genre": "Action",
      "GlobalSales": 4.66
    },
    {
      "Year": 2009,
      "Platform": "PS3",
      "Genre": "Action",
      "GlobalSales": 44.18
    },
    {
      "Year": 2009,
      "Platform": "Wii",
      "Genre": "Action",
      "GlobalSales": 18.93
    },
    {
      "Year": 2009,
      "Platform": "X360",
      "Genre": "Action",
      "GlobalSales": 29.32
    },
    {
      "Year": 2010,
      "Platform": "DS",
      "Genre": "Action",
      "GlobalSales": 14.72
    },
    {
      "Year": 2010,
      "Platform": "PS2",
      "Genre": "Action",
      "GlobalSales": 1.3499999999999999
    },
    {
      "Year": 2010,
      "Platform": "PS3",
      "Genre": "Action",
      "GlobalSales": 39.82
    },
    {
      "Year": 2010,
      "Platform": "Wii",
      "Genre": "Action",
      "GlobalSales": 16.94
    },
    {
      "Year": 2010,
      "Platform": "X360",
      "Genre": "Action",
      "GlobalSales": 33.61
    },
    {
      "Year": 2011,
      "Platform": "DS",
      "Genre": "Action",
      "GlobalSales": 7.14
    },
    {
      "Year": 2011,
      "Platform": "PS2",
      "Genre": "Action",
      "GlobalSales": 0.06
    },
    {
      "Year": 2011,
      "Platform": "PS3",
      "Genre": "Action",
      "GlobalSales": 44.59
    },
    {
      "Year": 2011,
      "Platform": "Wii",
      "Genre": "Action",
      "GlobalSales": 16.49
    },
    {
      "Year": 2011,
      "Platform": "X360",
      "Genre": "Action",
      "GlobalSales": 28.63
    },
    {
      "Year": 2012,
      "Platform": "DS",
      "Genre": "Action",
      "GlobalSales": 1.53
    },
    {
      "Year": 2012,
      "Platform": "PS3",
      "Genre": "Action",
      "GlobalSales": 45.45
    },
    {
      "Year": 2012,
      "Platform": "Wii",
      "Genre": "Action",
      "GlobalSales": 8.41
    },
    {
      "Year": 2012,
      "Platform": "X360",
      "Genre": "Action",
      "GlobalSales": 34.36
    },
    {
      "Year": 2013,
      "Platform": "DS",
      "Genre": "Action",
      "GlobalSales": 0.65
    },
    {
      "Year": 2013,
      "Platform": "PS3",
      "Genre": "Action",
      "GlobalSales": 54.44
    },
    {
      "Year": 2013,
      "Platform": "Wii",
      "Genre": "Action",
      "GlobalSales": 1.76
    },
    {
      "Year": 2013,
      "Platform": "X360",
      "Genre": "Action",
      "GlobalSales": 35.809999999999995
    },
    {
      "Year": 2014,
      "Platform": "DS",
      "Genre": "Action",
      "GlobalSales": 0.02
    },
    {
      "Year": 2014,
      "Platform": "PS3",
      "Genre": "Action",
      "GlobalSales": 12.68
    },
    {
      "Year": 2014,
      "Platform": "Wii",
      "Genre": "Action",
      "GlobalSales": 1.1300000000000001
    },
    {
      "Year": 2014,
      "Platform": "X360",
      "Genre": "Action",
      "GlobalSales": 9.59
    },
    {
      "Year": 2015,
      "Platform": "PS3",
      "Genre": "Action",
      "GlobalSales": 5.71
    },
    {
      "Year": 2015,
      "Platform": "Wii",
      "Genre": "Action",
      "GlobalSales": 0.35
    },
    {
      "Year": 2015,
      "Platform": "X360",
      "Genre": "Action",
      "GlobalSales": 3.14
    },
    {
      "Year": 2016,
      "Platform": "PS3",
      "Genre": "Action",
      "GlobalSales": 0.97
    },
    {
      "Year": 2016,
      "Platform": "X360",
      "Genre": "Action",
      "GlobalSales": 0.48000000000000004
    },
    {
      "Year": 2000,
      "Platform": "PS2",
      "Genre": "Role-Playing",
      "GlobalSales": 3.15
    },
    {
      "Year": 2001,
      "Platform": "PS2",
      "Genre": "Role-Playing",
      "GlobalSales": 10.91
    },
    {
      "Year": 2002,
      "Platform": "PS2",
      "Genre": "Role-Playing",
      "GlobalSales": 16.03
    },
    {
      "Year": 2003,
      "Platform": "PS2",
      "Genre": "Role-Playing",
      "GlobalSales": 11.24
    },
    {
      "Year": 2004,
      "Platform": "PS2",
      "Genre": "Role-Playing",
      "GlobalSales": 16.83
    },
    {
      "Year": 2005,
      "Platform": "DS",
      "Genre": "Role-Playing",
      "GlobalSales": 4.05
    },
    {
      "Year": 2005,
      "Platform": "PS2",
      "Genre": "Role-Playing",
      "GlobalSales": 12.95
    },
    {
      "Year": 2006,
      "Platform": "DS",
      "Genre": "Role-Playing",
      "GlobalSales": 28.169999999999998
    },
    {
      "Year": 2006,
      "Platform": "PS2",
      "Genre": "Role-Playing",
      "GlobalSales": 12.88
    },
    {
      "Year": 2006,
      "Platform": "PS3",
      "Genre": "Role-Playing",
      "GlobalSales": 0.5900000000000001
    },
    {
      "Year": 2006,
      "Platform": "Wii",
      "Genre": "Role-Playing",
      "GlobalSales": 2.02
    },
    {
      "Year": 2006,
      "Platform": "X360",
      "Genre": "Role-Playing",
      "GlobalSales": 8.6
    },
    {
      "Year": 2007,
      "Platform": "DS",
      "Genre": "Role-Playing",
      "GlobalSales": 14.5
    },
    {
      "Year": 2007,
      "Platform": "PS2",
      "Genre": "Role-Playing",
      "GlobalSales": 4.54
    },
    {
      "Year": 2007,
      "Platform": "PS3",
      "Genre": "Role-Playing",
      "GlobalSales": 3.7600000000000002
    },
    {
      "Year": 2007,
      "Platform": "Wii",
      "Genre": "Role-Playing",
      "GlobalSales": 1.1099999999999999
    },
    {
      "Year": 2007,
      "Platform": "X360",
      "Genre": "Role-Playing",
      "GlobalSales": 6.25
    },
    {
      "Year": 2008,
      "Platform": "DS",
      "Genre": "Role-Playing",
      "GlobalSales": 23.69
    },
    {
      "Year": 2008,
      "Platform": "PS2",
      "Genre": "Role-Playing",
      "GlobalSales": 2.59
    },
    {
      "Year": 2008,
      "Platform": "PS3",
      "Genre": "Role-Playing",
      "GlobalSales": 7.61
    },
    {
      "Year": 2008,
      "Platform": "Wii",
      "Genre": "Role-Playing",
      "GlobalSales": 1.6600000000000001
    },
    {
      "Year": 2008,
      "Platform": "X360",
      "Genre": "Role-Playing",
      "GlobalSales": 12.77
    },
    {
      "Year": 2009,
      "Platform": "DS",
      "Genre": "Role-Playing",
      "GlobalSales": 19.31
    },
    {
      "Year": 2009,
      "Platform": "PS2",
      "Genre": "Role-Playing",
      "GlobalSales": 0.41
    },
    {
      "Year": 2009,
      "Platform": "PS3",
      "Genre": "Role-Playing",
      "GlobalSales": 11.97
    },
    {
      "Year": 2009,
      "Platform": "Wii",
      "Genre": "Role-Playing",
      "GlobalSales": 4.96
    },
    {
      "Year": 2009,
      "Platform": "X360",
      "Genre": "Role-Playing",
      "GlobalSales": 6.16
    },
    {
      "Year": 2010,
      "Platform": "DS",
      "Genre": "Role-Playing",
      "GlobalSales": 26.19
    },
    {
      "Year": 2010,
      "Platform": "PS2",
      "Genre": "Role-Playing",
      "GlobalSales": 0.02
    },
    {
      "Year": 2010,
      "Platform": "PS3",
      "Genre": "Role-Playing",
      "GlobalSales": 9.35
    },
    {
      "Year": 2010,
      "Platform": "Wii",
      "Genre": "Role-Playing",
      "GlobalSales": 1.09
    },
    {
      "Year": 2010,
      "Platform": "X360",
      "Genre": "Role-Playing",
      "GlobalSales": 16.52
    },
    {
      "Year": 2011,
      "Platform": "DS",
      "Genre": "Role-Playing",
      "GlobalSales": 1.27
    },
    {
      "Year": 2011,
      "Platform": "PS3",
      "Genre": "Role-Playing",
      "GlobalSales": 18.62
    },
    {
      "Year": 2011,
      "Platform": "Wii",
      "Genre": "Role-Playing",
      "GlobalSales": 2.16
    },
    {
      "Year": 2011,
      "Platform": "X360",
      "Genre": "Role-Playing",
      "GlobalSales": 11.59
    },
    {
      "Year": 2012,
      "Platform": "DS",
      "Genre": "Role-Playing",
      "GlobalSales": 9.38
    },
    {
      "Year": 2012,
      "Platform": "PS3",
      "Genre": "Role-Playing",
      "GlobalSales": 6.31
    },
    {
      "Year": 2012,
      "Platform": "Wii",
      "Genre": "Role-Playing",
      "GlobalSales": 1.06
    },
    {
      "Year": 2012,
      "Platform": "X360",
      "Genre": "Role-Playing",
      "GlobalSales": 5.46
    },
    {
      "Year": 2013,
      "Platform": "PS3",
      "Genre": "Role-Playing",
      "GlobalSales": 10.15
    },
    {
      "Year": 2013,
      "Platform": "X360",
      "Genre": "Role-Playing",
      "GlobalSales": 1.74
    },
    {
      "Year": 2014,
      "Platform": "PS3",
      "Genre": "Role-Playing",
      "GlobalSales": 5.65
    },
    {
      "Year": 2014,
      "Platform": "X360",
      "Genre": "Role-Playing",
      "GlobalSales": 2.89
    },
    {
      "Year": 2015,
      "Platform": "PS3",
      "Genre": "Role-Playing",
      "GlobalSales": 0.7999999999999999
    },
    {
      "Year": 2016,
      "Platform": "PS3",
      "Genre": "Role-Playing",
      "GlobalSales": 0.43
    },
    {
      "Year": 2000,
      "Platform": "PS2",
      "Genre": "Shooter",
      "GlobalSales": 1.8299999999999998
    },
    {
      "Year": 2001,
      "Platform": "PS2",
      "Genre": "Shooter",
      "GlobalSales": 12.8
    },
    {
      "Year": 2002,
      "Platform": "PS2",
      "Genre": "Shooter",
      "GlobalSales": 27.75
    },
    {
      "Year": 2003,
      "Platform": "PS2",
      "Genre": "Shooter",
      "GlobalSales": 15.12
    },
    {
      "Year": 2004,
      "Platform": "PS2",
      "Genre": "Shooter",
      "GlobalSales": 21.61
    },
    {
      "Year": 2005,
      "Platform": "DS",
      "Genre": "Shooter",
      "GlobalSales": 0.21
    },
    {
      "Year": 2005,
      "Platform": "PS2",
      "Genre": "Shooter",
      "GlobalSales": 18.48
    },
    {
      "Year": 2005,
      "Platform": "X360",
      "Genre": "Shooter",
      "GlobalSales": 3.17
    },
    {
      "Year": 2006,
      "Platform": "DS",
      "Genre": "Shooter",
      "GlobalSales": 1.61
    },
    {
      "Year": 2006,
      "Platform": "PS2",
      "Genre": "Shooter",
      "GlobalSales": 7.09
    },
    {
      "Year": 2006,
      "Platform": "PS3",
      "Genre": "Shooter",
      "GlobalSales": 5.869999999999999
    },
    {
      "Year": 2006,
      "Platform": "Wii",
      "Genre": "Shooter",
      "GlobalSales": 0.91
    },
    {
      "Year": 2006,
      "Platform": "X360",
      "Genre": "Shooter",
      "GlobalSales": 15.690000000000001
    },
    {
      "Year": 2007,
      "Platform": "DS",
      "Genre": "Shooter",
      "GlobalSales": 2.04
    },
    {
      "Year": 2007,
      "Platform": "PS2",
      "Genre": "Shooter",
      "GlobalSales": 0.32
    },
    {
      "Year": 2007,
      "Platform": "PS3",
      "Genre": "Shooter",
      "GlobalSales": 15.709999999999999
    },
    {
      "Year": 2007,
      "Platform": "Wii",
      "Genre": "Shooter",
      "GlobalSales": 8.67
    },
    {
      "Year": 2007,
      "Platform": "X360",
      "Genre": "Shooter",
      "GlobalSales": 34.17
    },
    {
      "Year": 2008,
      "Platform": "DS",
      "Genre": "Shooter",
      "GlobalSales": 1.54
    },
    {
      "Year": 2008,
      "Platform": "PS2",
      "Genre": "Shooter",
      "GlobalSales": 2.57
    },
    {
      "Year": 2008,
      "Platform": "PS3",
      "Genre": "Shooter",
      "GlobalSales": 20.1
    },
    {
      "Year": 2008,
      "Platform": "Wii",
      "Genre": "Shooter",
      "GlobalSales": 5.46
    },
    {
      "Year": 2008,
      "Platform": "X360",
      "Genre": "Shooter",
      "GlobalSales": 28.9
    },
    {
      "Year": 2009,
      "Platform": "DS",
      "Genre": "Shooter",
      "GlobalSales": 1.3800000000000001
    },
    {
      "Year": 2009,
      "Platform": "PS2",
      "Genre": "Shooter",
      "GlobalSales": 0.65
    },
    {
      "Year": 2009,
      "Platform": "PS3",
      "Genre": "Shooter",
      "GlobalSales": 22.75
    },
    {
      "Year": 2009,
      "Platform": "Wii",
      "Genre": "Shooter",
      "GlobalSales": 6.69
    },
    {
      "Year": 2009,
      "Platform": "X360",
      "Genre": "Shooter",
      "GlobalSales": 34.23
    },
    {
      "Year": 2010,
      "Platform": "DS",
      "Genre": "Shooter",
      "GlobalSales": 1.06
    },
    {
      "Year": 2010,
      "Platform": "PS2",
      "Genre": "Shooter",
      "GlobalSales": 0.06
    },
    {
      "Year": 2010,
      "Platform": "PS3",
      "Genre": "Shooter",
      "GlobalSales": 28.45
    },
    {
      "Year": 2010,
      "Platform": "Wii",
      "Genre": "Shooter",
      "GlobalSales": 3.23
    },
    {
      "Year": 2010,
      "Platform": "X360",
      "Genre": "Shooter",
      "GlobalSales": 41.58
    },
    {
      "Year": 2011,
      "Platform": "DS",
      "Genre": "Shooter",
      "GlobalSales": 0.36
    },
    {
      "Year": 2011,
      "Platform": "PS3",
      "Genre": "Shooter",
      "GlobalSales": 40.25
    },
    {
      "Year": 2011,
      "Platform": "Wii",
      "Genre": "Shooter",
      "GlobalSales": 1.3800000000000001
    },
    {
      "Year": 2011,
      "Platform": "X360",
      "Genre": "Shooter",
      "GlobalSales": 45.81
    },
    {
      "Year": 2012,
      "Platform": "PS3",
      "Genre": "Shooter",
      "GlobalSales": 29.24
    },
    {
      "Year": 2012,
      "Platform": "X360",
      "Genre": "Shooter",
      "GlobalSales": 37.5
    },
    {
      "Year": 2013,
      "Platform": "PS3",
      "Genre": "Shooter",
      "GlobalSales": 20.38
    },
    {
      "Year": 2013,
      "Platform": "X360",
      "Genre": "Shooter",
      "GlobalSales": 22.04
    },
    {
      "Year": 2014,
      "Platform": "PS3",
      "Genre": "Shooter",
      "GlobalSales": 10.34
    },
    {
      "Year": 2014,
      "Platform": "X360",
      "Genre": "Shooter",
      "GlobalSales": 11.639999999999999
    },
    {
      "Year": 2015,
      "Platform": "PS3",
      "Genre": "Shooter",
      "GlobalSales": 2.69
    },
    {
      "Year": 2015,
      "Platform": "X360",
      "Genre": "Shooter",
      "GlobalSales": 2.48
    },
    {
      "Year": 2016,
      "Platform": "PS3",
      "Genre": "Shooter",
      "GlobalSales": 0.02
    },
    {
      "Year": 2016,
      "Platform": "X360",
      "Genre": "Shooter",
      "GlobalSales": 0.02
    },
    {
      "Year": 2000,
      "Platform": "PS2",
      "Genre": "Sports",
      "GlobalSales": 9.5
    },
    {
      "Year": 2001,
      "Platform": "PS2",
      "Genre": "Sports",
      "GlobalSales": 32.74
    },
    {
      "Year": 2002,
      "Platform": "PS2",
      "Genre": "Sports",
      "GlobalSales": 44.56
    },
    {
      "Year": 2003,
      "Platform": "PS2",
      "Genre": "Sports",
      "GlobalSales": 33.2
    },
    {
      "Year": 2004,
      "Platform": "DS",
      "Genre": "Sports",
      "GlobalSales": 0.46
    },
    {
      "Year": 2004,
      "Platform": "PS2",
      "Genre": "Sports",
      "GlobalSales": 40.9
    },
    {
      "Year": 2005,
      "Platform": "DS",
      "Genre": "Sports",
      "GlobalSales": 0.87
    },
    {
      "Year": 2005,
      "Platform": "PS2",
      "Genre": "Sports",
      "GlobalSales": 33.33
    },
    {
      "Year": 2005,
      "Platform": "X360",
      "Genre": "Sports",
      "GlobalSales": 1.33
    },
    {
      "Year": 2006,
      "Platform": "DS",
      "Genre": "Sports",
      "GlobalSales": 2.68
    },
    {
      "Year": 2006,
      "Platform": "PS2",
      "Genre": "Sports",
      "GlobalSales": 26.68
    },
    {
      "Year": 2006,
      "Platform": "PS3",
      "Genre": "Sports",
      "GlobalSales": 2.42
    },
    {
      "Year": 2006,
      "Platform": "Wii",
      "Genre": "Sports",
      "GlobalSales": 84.03
    },
    {
      "Year": 2006,
      "Platform": "X360",
      "Genre": "Sports",
      "GlobalSales": 9.11
    },
    {
      "Year": 2007,
      "Platform": "DS",
      "Genre": "Sports",
      "GlobalSales": 4.51
    },
    {
      "Year": 2007,
      "Platform": "PS2",
      "Genre": "Sports",
      "GlobalSales": 18.46
    },
    {
      "Year": 2007,
      "Platform": "PS3",
      "Genre": "Sports",
      "GlobalSales": 11.540000000000001
    },
    {
      "Year": 2007,
      "Platform": "Wii",
      "Genre": "Sports",
      "GlobalSales": 45.54
    },
    {
      "Year": 2007,
      "Platform": "X360",
      "Genre": "Sports",
      "GlobalSales": 11.59
    },
    {
      "Year": 2008,
      "Platform": "DS",
      "Genre": "Sports",
      "GlobalSales": 13.29
    },
    {
      "Year": 2008,
      "Platform": "PS2",
      "Genre": "Sports",
      "GlobalSales": 12.52
    },
    {
      "Year": 2008,
      "Platform": "PS3",
      "Genre": "Sports",
      "GlobalSales": 14.44
    },
    {
      "Year": 2008,
      "Platform": "Wii",
      "Genre": "Sports",
      "GlobalSales": 33.26
    },
    {
      "Year": 2008,
      "Platform": "X360",
      "Genre": "Sports",
      "GlobalSales": 15.54
    },
    {
      "Year": 2009,
      "Platform": "DS",
      "Genre": "Sports",
      "GlobalSales": 6.33
    },
    {
      "Year": 2009,
      "Platform": "PS2",
      "Genre": "Sports",
      "GlobalSales": 7.39
    },
    {
      "Year": 2009,
      "Platform": "PS3",
      "Genre": "Sports",
      "GlobalSales": 16.29
    },
    {
      "Year": 2009,
      "Platform": "Wii",
      "Genre": "Sports",
      "GlobalSales": 88.17
    },
    {
      "Year": 2009,
      "Platform": "X360",
      "Genre": "Sports",
      "GlobalSales": 14.98
    },
    {
      "Year": 2010,
      "Platform": "DS",
      "Genre": "Sports",
      "GlobalSales": 2.94
    },
    {
      "Year": 2010,
      "Platform": "PS2",
      "Genre": "Sports",
      "GlobalSales": 3.09
    },
    {
      "Year": 2010,
      "Platform": "PS3",
      "Genre": "Sports",
      "GlobalSales": 26.45
    },
    {
      "Year": 2010,
      "Platform": "Wii",
      "Genre": "Sports",
      "GlobalSales": 25.23
    },
    {
      "Year": 2010,
      "Platform": "X360",
      "Genre": "Sports",
      "GlobalSales": 28.650000000000002
    },
    {
      "Year": 2011,
      "Platform": "DS",
      "Genre": "Sports",
      "GlobalSales": 0.52
    },
    {
      "Year": 2011,
      "Platform": "PS2",
      "Genre": "Sports",
      "GlobalSales": 0.27
    },
    {
      "Year": 2011,
      "Platform": "PS3",
      "Genre": "Sports",
      "GlobalSales": 17.84
    },
    {
      "Year": 2011,
      "Platform": "Wii",
      "Genre": "Sports",
      "GlobalSales": 11.26
    },
    {
      "Year": 2011,
      "Platform": "X360",
      "Genre": "Sports",
      "GlobalSales": 19.59
    },
    {
      "Year": 2012,
      "Platform": "DS",
      "Genre": "Sports",
      "GlobalSales": 0.08
    },
    {
      "Year": 2012,
      "Platform": "PS3",
      "Genre": "Sports",
      "GlobalSales": 12.63
    },
    {
      "Year": 2012,
      "Platform": "Wii",
      "Genre": "Sports",
      "GlobalSales": 1.25
    },
    {
      "Year": 2012,
      "Platform": "X360",
      "Genre": "Sports",
      "GlobalSales": 10.55
    },
    {
      "Year": 2013,
      "Platform": "DS",
      "Genre": "Sports",
      "GlobalSales": 0.03
    },
    {
      "Year": 2013,
      "Platform": "PS3",
      "Genre": "Sports",
      "GlobalSales": 15.19
    },
    {
      "Year": 2013,
      "Platform": "Wii",
      "Genre": "Sports",
      "GlobalSales": 0.45
    },
    {
      "Year": 2013,
      "Platform": "X360",
      "Genre": "Sports",
      "GlobalSales": 12.54
    },
    {
      "Year": 2014,
      "Platform": "PS3",
      "Genre": "Sports",
      "GlobalSales": 10.92
    },
    {
      "Year": 2014,
      "Platform": "Wii",
      "Genre": "Sports",
      "GlobalSales": 0.76
    },
    {
      "Year": 2014,
      "Platform": "X360",
      "Genre": "Sports",
      "GlobalSales": 8.56
    },
    {
      "Year": 2015,
      "Platform": "PS3",
      "Genre": "Sports",
      "GlobalSales": 6.36
    },
    {
      "Year": 2015,
      "Platform": "X360",
      "Genre": "Sports",
      "GlobalSales": 4.66
    },
    {
      "Year": 2016,
      "Platform": "PS3",
      "Genre": "Sports",
      "GlobalSales": 0.83
    },
    {
      "Year": 2016,
      "Platform": "X360",
      "Genre": "Sports",
      "GlobalSales": 0.33
    }
  ],
  "regional": [
    {
      "Platform": "3DS",
      "TotalSales": 58.52,
      "RegionDisplay": "EU"
    },
    {
      "Platform": "3DS",
      "TotalSales": 97.35,
      "RegionDisplay": "JP"
    },
    {
      "Platform": "3DS",
      "TotalSales": 78.87,
      "RegionDisplay": "NA"
    },
    {
      "Platform": "3DS",
      "TotalSales": 12.63,
      "RegionDisplay": "Other"
    },
    {
      "Platform": "DS",
      "TotalSales": 194.65,
      "RegionDisplay": "EU"
    },
    {
      "Platform": "DS",
      "TotalSales": 175.57,
      "RegionDisplay": "JP"
    },
    {
      "Platform": "DS",
      "TotalSales": 390.71,
      "RegionDisplay": "NA"
    },
    {
      "Platform": "DS",
      "TotalSales": 60.53,
      "RegionDisplay": "Other"
    },
    {
      "Platform": "GBA",
      "TotalSales": 75.25,
      "RegionDisplay": "EU"
    },
    {
      "Platform": "GBA",
      "TotalSales": 47.33,
      "RegionDisplay": "JP"
    },
    {
      "Platform": "GBA",
      "TotalSales": 187.54,
      "RegionDisplay": "NA"
    },
    {
      "Platform": "GBA",
      "TotalSales": 7.73,
      "RegionDisplay": "Other"
    },
    {
      "Platform": "PC",
      "TotalSales": 139.68,
      "RegionDisplay": "EU"
    },
    {
      "Platform": "PC",
      "TotalSales": 0.16999999999999998,
      "RegionDisplay": "JP"
    },
    {
      "Platform": "PC",
      "TotalSales": 93.28,
      "RegionDisplay": "NA"
    },
    {
      "Platform": "PC",
      "TotalSales": 24.86,
      "RegionDisplay": "Other"
    },
    {
      "Platform": "PS",
      "TotalSales": 213.6,
      "RegionDisplay": "EU"
    },
    {
      "Platform": "PS",
      "TotalSales": 139.82,
      "RegionDisplay": "JP"
    },
    {
      "Platform": "PS",
      "TotalSales": 336.51,
      "RegionDisplay": "NA"
    },
    {
      "Platform": "PS",
      "TotalSales": 40.910000000000004,
      "RegionDisplay": "Other"
    },
    {
      "Platform": "PS2",
      "TotalSales": 339.29,
      "RegionDisplay": "EU"
    },
    {
      "Platform": "PS2",
      "TotalSales": 139.2,
      "RegionDisplay": "JP"
    },
    {
      "Platform": "PS2",
      "TotalSales": 583.84,
      "RegionDisplay": "NA"
    },
    {
      "Platform": "PS2",
      "TotalSales": 193.44,
      "RegionDisplay": "Other"
    },
    {
      "Platform": "PS3",
      "TotalSales": 343.71,
      "RegionDisplay": "EU"
    },
    {
      "Platform": "PS3",
      "TotalSales": 79.99,
      "RegionDisplay": "JP"
    },
    {
      "Platform": "PS3",
      "TotalSales": 392.26,
      "RegionDisplay": "NA"
    },
    {
      "Platform": "PS3",
      "TotalSales": 141.93,
      "RegionDisplay": "Other"
    },
    {
      "Platform": "PS4",
      "TotalSales": 123.7,
      "RegionDisplay": "EU"
    },
    {
      "Platform": "PS4",
      "TotalSales": 14.3,
      "RegionDisplay": "JP"
    },
    {
      "Platform": "PS4",
      "TotalSales": 96.8,
      "RegionDisplay": "NA"
    },
    {
      "Platform": "PS4",
      "TotalSales": 43.36,
      "RegionDisplay": "Other"
    },
    {
      "Platform": "PSP",
      "TotalSales": 68.25,
      "RegionDisplay": "EU"
    },
    {
      "Platform": "PSP",
      "TotalSales": 76.79,
      "RegionDisplay": "JP"
    },
    {
      "Platform": "PSP",
      "TotalSales": 108.99,
      "RegionDisplay": "NA"
    },
    {
      "Platform": "PSP",
      "TotalSales": 42.19,
      "RegionDisplay": "Other"
    },
    {
      "Platform": "Wii",
      "TotalSales": 268.38,
      "RegionDisplay": "EU"
    },
    {
      "Platform": "Wii",
      "TotalSales": 69.35000000000001,
      "RegionDisplay": "JP"
    },
    {
      "Platform": "Wii",
      "TotalSales": 507.71,
      "RegionDisplay": "NA"
    },
    {
      "Platform": "Wii",
      "TotalSales": 80.61,
      "RegionDisplay": "Other"
    },
    {
      "Platform": "X360",
      "TotalSales": 280.58,
      "RegionDisplay": "EU"
    },
    {
      "Platform": "X360",
      "TotalSales": 12.43,
      "RegionDisplay": "JP"
    },
    {
      "Platform": "X360",
      "TotalSales": 601.05,
      "RegionDisplay": "NA"
    },
    {
      "Platform": "X360",
      "TotalSales": 85.54,
      "RegionDisplay": "Other"
    }
  ],
  "story": [
    {
      "Genre": "Action",
      "GlobalSales": 1751.18,
      "JapanSales": 159.95,
      "JapanShare": 0.091338
    },
    {
      "Genre": "Adventure",
      "GlobalSales": 239.04,
      "JapanSales": 52.07,
      "JapanShare": 0.21783
    },
    {
      "Genre": "Fighting",
      "GlobalSales": 448.91,
      "JapanSales": 87.35000000000001,
      "JapanShare": 0.194582
    },
    {
      "Genre": "Misc",
      "GlobalSales": 809.96,
      "JapanSales": 107.76,
      "JapanShare": 0.133044
    },
    {
      "Genre": "Platform",
      "GlobalSales": 831.37,
      "JapanSales": 130.77,
      "JapanShare": 0.157295
    },
    {
      "Genre": "Puzzle",
      "GlobalSales": 244.95,
      "JapanSales": 57.31,
      "JapanShare": 0.233966
    },
    {
      "Genre": "Racing",
      "GlobalSales": 732.04,
      "JapanSales": 56.69,
      "JapanShare": 0.077441
    },
    {
      "Genre": "Role-Playing",
      "GlobalSales": 927.37,
      "JapanSales": 352.31,
      "JapanShare": 0.379902
    },
    {
      "Genre": "Shooter",
      "GlobalSales": 1037.37,
      "JapanSales": 38.28,
      "JapanShare": 0.036901
    },
    {
      "Genre": "Simulation",
      "GlobalSales": 392.2,
      "JapanSales": 63.7,
      "JapanShare": 0.162417
    },
    {
      "Genre": "Sports",
      "GlobalSales": 1330.93,
      "JapanSales": 135.37,
      "JapanShare": 0.101711
    },
    {
      "Genre": "Strategy",
      "GlobalSales": 175.12,
      "JapanSales": 49.46,
      "JapanShare": 0.282435
    }
  ]
};

function renderGenrePlatformHeatmap() {
  const target = "#viz-genre-platform";
  if (!document.querySelector(target)) return;

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { values: VG_DATA.heatmap },
    transform: [
      { filter: { field: "Platform", oneOf: PRIMARY_PLATFORMS } }
    ],
    mark: { type: "rect", tooltip: true },
    encoding: {
      x: { field: "Platform", type: "nominal", sort: PRIMARY_PLATFORMS, title: "Platform" },
      y: { field: "Genre", type: "nominal", title: "Genre" },
      color: {
        field: "GlobalSales",
        type: "quantitative",
        title: "Global Sales (M units)",
        scale: { scheme: "blues" }
      },
      tooltip: [
        { field: "Genre", title: "Genre" },
        { field: "Platform", title: "Platform" },
        { field: "GlobalSales", title: "Global Sales (M)", format: ".2f" }
      ]
    },
    config: {
      view: { stroke: "transparent" },
      axis: { labelFontSize: 12, titleFontSize: 13 }
    }
  };

  vegaEmbed(target, spec, CHART_OPTIONS).catch((err) => console.error(err));
}

function renderSalesOverTime() {
  const target = "#viz-time-series";
  if (!document.querySelector(target)) return;

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { values: VG_DATA.trend },
    transform: [
      { filter: { field: "Platform", oneOf: TOP_PLATFORMS_FOR_TRENDS } },
      { filter: { field: "Genre", oneOf: TOP_GENRES_FOR_TRENDS } }
    ],
    facet: {
      row: {
        field: "Genre",
        type: "nominal",
        sort: TOP_GENRES_FOR_TRENDS,
        header: { labelFontSize: 13, title: null }
      }
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
          scale: { nice: false }
        },
        y: { field: "GlobalSales", type: "quantitative", title: "Global sales (M)" },
        color: {
          field: "Platform",
          type: "nominal",
          sort: TOP_PLATFORMS_FOR_TRENDS,
          title: "Platform",
          legend: { orient: "bottom", columns: 3, labelFontSize: 12 }
        },
        tooltip: [
          { field: "Year", type: "quantitative", title: "Year" },
          { field: "Genre", title: "Genre" },
          { field: "Platform", title: "Platform" },
          { field: "GlobalSales", title: "Global Sales (M)", format: ".2f" }
        ]
      }
    },
    resolve: { scale: { y: "independent" } },
    config: {
      facet: { spacing: 20 },
      axis: { labelFontSize: 11, titleFontSize: 12 }
    }
  };

  vegaEmbed(target, spec, CHART_OPTIONS).catch((err) => console.error(err));
}

function renderRegionalStackedBars() {
  const target = "#viz-regional";
  if (!document.querySelector(target)) return;

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { values: VG_DATA.regional },
    transform: [
      { filter: { field: "Platform", oneOf: TOP_PLATFORM_ORDER } }
    ],
    mark: { type: "bar", tooltip: true },
    encoding: {
      x: { field: "Platform", type: "nominal", sort: TOP_PLATFORM_ORDER, title: "Platform" },
      y: { field: "TotalSales", type: "quantitative", title: "Units sold (M)" },
      color: {
        field: "RegionDisplay",
        type: "nominal",
        title: "Region",
        scale: { domain: REGION_ORDER, range: ["#1f77b4", "#ff7f0e", "#2ca02c", "#9467bd"] }
      },
      tooltip: [
        { field: "Platform", title: "Platform" },
        { field: "RegionDisplay", title: "Region" },
        { field: "TotalSales", title: "Sales (M)", format: ".2f" }
      ]
    },
    config: {
      axis: { labelFontSize: 12, titleFontSize: 13 },
      view: { stroke: "transparent" }
    }
  };

  vegaEmbed(target, spec, CHART_OPTIONS).catch((err) => console.error(err));
}

function renderJapanStory() {
  const target = "#viz-story";
  if (!document.querySelector(target)) return;

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { values: VG_DATA.story },
    mark: { type: "point", filled: true, size: 200, opacity: 0.9 },
    encoding: {
      x: { field: "GlobalSales", type: "quantitative", title: "Global sales (M units)" },
      y: { field: "JapanShare", type: "quantitative", title: "Share of sales in Japan", axis: { format: ".0%" } },
      color: { field: "Genre", type: "nominal", title: "Genre" },
      size: { field: "GlobalSales", type: "quantitative", title: "Global sales (M)", scale: { range: [80, 600] } },
      tooltip: [
        { field: "Genre", title: "Genre" },
        { field: "GlobalSales", title: "Global Sales (M)", format: ".1f" },
        { field: "JapanSales", title: "Japan Sales (M)", format: ".1f" },
        { field: "JapanShare", title: "Japan Share", format: ".0%" }
      ]
    },
    config: {
      axis: { labelFontSize: 12, titleFontSize: 13 },
      view: { stroke: "transparent" },
      legend: { labelFontSize: 12, titleFontSize: 13 }
    }
  };

  vegaEmbed(target, spec, CHART_OPTIONS).catch((err) => console.error(err));
}
