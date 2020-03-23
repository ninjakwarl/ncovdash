const axios = require("axios");
let covid = require("novelcovid");
const utilities = require("../utilities");

const URL = "https://corona.lmao.ninja/states";
const keyMapping = {
  country: "country",
  cases: "cases",
  deaths: "deaths",
  recovered: "recovered",
  todayCases: "todayCases",
  todayDeaths: "todayDeaths"
};
const stateKeyMapping = {
  country: "state",
  cases: "cases",
  deaths: "deaths",
  recovered: "recovered",
  todayCases: "todayCases",
  todayDeaths: "todayDeaths"
};

exports.fetchData = async () => {
  let allCountries = await covid.countries();

  return axios({
    method: "get",
    url: URL,
    responseType: "text"
  }).then(response => {
    let allStates = response.data;

    allCountries = allCountries.map(country =>
      utilities.convertAllKeysToString(utilities.remapKeys(country, keyMapping))
    );
    allStates = allStates.map(state =>
      utilities.convertAllKeysToString(
        utilities.remapKeys(state, stateKeyMapping)
      )
    );

    data = allCountries.concat(allStates);

    return utilities.renameCountryLabels(data);
  });
};
