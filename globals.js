exports.allRegions = [{
    name: "World",
    sheetName: "Global",
    startKey: "WORLD",
    totalKey: "TOTAL",
    scraper: "bno"
  },
  {
    name: "USA",
    sheetName: "USA",
    startKey: "UNITED STATES",
    totalKey: "U.S. TOTAL",
    scraper: "bno"
  },
  {
    name: "China",
    sheetName: "China",
    startKey: "MAINLAND CHINA",
    totalKey: "TOTAL",
    scraper: "bno"
  },
  {
    name: "Canada",
    sheetName: "Canada",
    startKey: "CANADA",
    totalKey: "TOTAL",
    scraper: "bno"
  },
  {
    name: "Australia",
    sheetName: "Australia",
    startKey: "AUSTRALIA",
    totalKey: "TOTAL",
    scraper: "bno"
  },
  {
    name: "Latin America",
    sheetName: "LatinAmerica",
    startKey: "Mundo Hispano",
    totalKey: "TOTAL",
    scraper: "bno"
  },
  {
    name: "Europe",
    sheetName: "Europe",
    scraper: "coronatracker"
  }
];

exports.displayOrder = [
  "Global",
  "USA",
  "Europe",
  "China",
  "Canada",
  "Australia",
  "LatinAmerica"
];

exports.countryLists = {
  Europe: [
    "Albania",
    "Austria",
    "Belarus",
    "Belgium",
    "Bosnia and Herzegovina",
    "Bulgaria",
    "Czechia",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Ireland",
    "Italy",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Netherlands",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "San Marino",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "United Kingdom"
  ]
};

exports.AlternativeLabelNames = {
  "Bosnia and Herzegovina": "Bosnia",
  "Brasil": "Brazil",
  "Czechia": "Czech Republic",
  "México": "Mexico",
  "Panamá": "Panama",
  "Rep. Dominicana": "Dominican Republic"
}

exports.regionStructure = {
  regionName: "",
  regions: [],
  regionTotal: {}
};

exports.countryStructure = {
  country: "TOTAL",
  cases: "",
  deaths: "",
  recovered: "",
  serious: "",
  critical: "",
  todayCases: "",
  todayDeaths: ""
};

exports.CSV_URL = 'https://docs.google.com/spreadsheets/d/14dnT6yUxZiHWvPaEiWsOKu1xPQ_xwkuuUDfMGmFHinc/gviz/tq?tqx=out:csv&sheet=';
