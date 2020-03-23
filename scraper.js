const cron = require("node-cron");
const stats = require("./fetchData");


console.log("Scraper scheduled.");

stats.fetchAllData();

//Fetch data three minutes.
cron.schedule("*/3 * * * *", () => {
  try {
    console.log("Fetching data.");
    stats.fetchAllData();
  } catch(error) {
    console.error(error)
  }
});
