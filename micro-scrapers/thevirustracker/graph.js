const axios = require("axios");
const fs = require("fs");
const utilities = require("../../utilities");

const URL =
  "https://thevirustracker.com/free-api?countryTimeline=US";

exports.fetchData = () => {
    return axios({
      method: "get",
      url: URL,
      responseType: "text"
    }).then(response => {
      console.log(response.data);
        return utilities.writeJSONFile('graph', response.data)
    });
  };
