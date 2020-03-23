const globals = require("./globals");
const fs = require("fs");
const utilities = require("./utilities");

exports.gatherAllRegions = () => {
  return Promise.all(
    globals.allRegions.map(region =>
      fs.promises.readFile(utilities.getJSONPath(region.sheetName))
    )
  ).then(values => {
    let data = {};

    values.forEach(region => {
      const regionData = JSON.parse(region);
      const regionName = regionData.regionName;

      data[regionName] = regionData;
      data[regionName].recoveryRate = utilities.calculatePercentage(
        data[regionName].regionTotal.recovered,
        data[regionName].regionTotal.cases,
        true,
        false
      ),
      data[regionName].regionTotal.todayDeathRate = utilities.calculatePercentage(
        data[regionName].regionTotal.todayDeaths,
        data[regionName].regionTotal.deaths
      ),
      data[regionName].regionTotal.todayCaseRate = utilities.calculatePercentage(
        data[regionName].regionTotal.todayCases,
        data[regionName].regionTotal.cases
      )
    });

    return {
      ...data,
      allRegions: Object.keys(data)
    };
  });
};
