const moment = require("moment");

exports.setUpdatedTime = () => {
  return moment().format();
};

exports.getTimeSinceLastUpdated = updatedTime => {
  return moment(updatedTime).fromNow();
};
