const mongoose = require("mongoose");

const mainlandChinaSchema = mongoose.Schema({
    maindlandChinaArray: Array,
    chinaRegionsArray: Array,
    internationalArray: Array,
    sources: Array,
    regionsSources: Array,
    internationalSources: Array,
    quickFactsData: Array,
    totalConfirmed: String,
    totalDead: Array,
    totalCountries: Number,
    timelineDataSplitArray: Array,
    timelineDates: Array,
    timelineArrayDates: Array,
    timelineDataSources: Object
});

module.exports = mongoose.model("MainlandChinaStatsModel", mainlandChinaSchema);
