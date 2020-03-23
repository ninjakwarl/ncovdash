const axios = require("axios");
const fs = require("fs");
const utilities = require("../utilities");

const URL =
  "https://ix.cnn.io/dailygraphics/graphics/20200306-us-covid19/static/js/main.chunk.js";
const JSON_REGEX = /(?<=55\:function\(s\){s.exports=JSON.parse\(')(.*)(?='\))/g;

const keyMapping = {
  country: "name",
  cases: "value"
};

exports.fetchData = () => {
  return axios({
    method: "get",
    url: URL,
    responseType: "text"
  }).then(response => {
      return extractJSON(response.data).map(state => {
        return utilities.remapKeys(state, keyMapping)
      })
  });
};

const extractJSON = data => {
  return JSON.parse(data.match(JSON_REGEX)).map(region => utilities.convertAllKeysToString(region));
};
