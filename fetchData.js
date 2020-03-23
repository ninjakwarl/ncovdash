const globals = require("./globals");
const utilities = require("./utilities");
const bnoScraper = require("./micro-scrapers/bno");
const cnnScraper = require("./micro-scrapers/cnn");
const novelcovid = require("./micro-scrapers/novelcovid");
const coronatrackerScraper = require("./micro-scrapers/coronatracker");
const fs = require("fs");

exports.fetchAllData = async () => {
  const allData = {};
  const bnoRegions = globals.allRegions
    .filter(region => {
      return region.scraper === "bno";
    })
    .map(region => bnoScraper.fetchData(region));

  Promise.all(bnoRegions)
    .then(data => {
      // Gather BNO data as base.
      data.map(resolvedRegion => {
        if (resolvedRegion === {})
          return Promise.reject("Couldn't fetch data for a region.");
        allData[resolvedRegion.regionName] = resolvedRegion;
      });

      if (Object.keys(allData).indexOf("undefined") >= 0) {
        return Promise.reject("Couldn't fetch data.");
      }

      console.log("[SYNC] Fetching all BNO data.");

      allData["LatinAmerica"].regions,
        (allData["Global"].regions = utilities.syncTwoRegions(
          allData["LatinAmerica"].regions,
          allData["Global"].regions
        ));
    })
    .then(() => {
      // Sync coronatracker data and BNO data.
      coronatrackerScraper
        .getSelectedCountries("Europe", globals.countryLists["Europe"])
        .then(europeanData => {
          allData["Europe"] = europeanData;

          allData["Europe"].regions,
            (allData["Global"].regions = utilities.syncTwoRegions(
              allData["Europe"].regions,
              allData["Global"].regions
            ));
        })
        .then(() => {
          // Sync USA data and CNN data.
          cnnScraper.fetchData().then(cnnData => {
            cnnData,
              (allData["USA"].regions = utilities.syncTwoRegions(
                cnnData,
                allData["USA"].regions
              ));

            // Sync with Overrides and write final finals.
            gatherAllOverrides(allData);
          });
        });
    });
};

const calculatePercentages = regions => {
  regions.map(region => {
    region.todayDeathRate = utilities.calculatePercentage(
      region.todayDeaths,
      region.deaths,
      false
    );
    region.todayCaseRate = utilities.calculatePercentage(
      region.todayCases,
      region.cases
    );
  });
  return regions;
};

const syncWithAllCountryList = allData => {
  return novelcovid.fetchData().then(novelData => {
    Object.keys(allData).map(region => {
      allData[region].regions,
        (novelData = utilities.syncTwoRegions(
          allData[region].regions,
          novelData,
          region,
          [{region: "Global", skip: "Georgia"}]
        ));

      allData[region].regions = calculatePercentages(allData[region].regions);


      if(region !== "Global") {
        allData[region].regionTotal = utilities.calculateRegionTotal(
          allData[region].regions
        );
      }
    });
    return allData;
  });
};

const gatherAllOverrides = allData => {
  return Promise.all(
    Object.keys(allData).map(region =>
      fs.promises.readFile(`${utilities.getOverridesJSONPath(region)}`)
    )
  ).then(values => {
    let data = {};

    values.forEach(region => {
      const regionData = JSON.parse(region);
      data[regionData.regionName] = regionData;
    });

    Object.keys(data).map(region => {
      data[region].regions,
        (allData[region].regions = utilities.syncTwoRegions(
          data[region].regions,
          allData[region].regions
        ));
    });

    syncWithAllCountryList(allData).then(allSyncedData => {
      allSyncedData["Global"].regionTotal.todayCases = "0";
      allSyncedData["Global"].regionTotal.todayDeaths = "0";

      allSyncedData["Global"].regions.map((region, index) => {
        if (region.country === "United States") {
          (allSyncedData["USA"].recoveryRate = utilities.calculatePercentage(
            allSyncedData["USA"].regionTotal.recovered,
            allSyncedData["USA"].regionTotal.cases,
            true,
            false
          )),
            (allSyncedData[
              "USA"
            ].regionTotal.todayDeathRate = utilities.calculatePercentage(
              allSyncedData["USA"].regionTotal.deaths,
              allSyncedData["USA"].regionTotal.cases,
              false,
              true
            )),
            (allSyncedData[
              "USA"
            ].regionTotal.todayCaseRate = utilities.calculatePercentage(
              allSyncedData["USA"].regionTotal.todayCases,
              allSyncedData["USA"].regionTotal.cases,
              false,
              true
            ));

          allSyncedData["Global"].regions[index] =
            allSyncedData["USA"].regionTotal;
          allSyncedData["Global"].regions[index].country = "United States";
        }
      });

      // TODO: Sync other Regions with Global data.

      Object.keys(data).map(region => {
        console.log(`[SYNC] Successful: ${region} - Saved.`);
        utilities.writeJSONFile(region, allSyncedData[region]);
      });
    });
  });
};
