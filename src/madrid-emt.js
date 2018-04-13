const EMT = require('emt-bus')(process.env.EMT_CLIENT_ID, process.env.EMT_KEY);

const geo = EMT('geo');

/**
 * @param {Number} time
 */
const parseTimeLeft = (time) => {
  let result;
  if (time < 60) {
    result = `${time} seconds`;
  } else {
    result = `${Math.floor(time / 60)} minutes`;
  }

  return result;
};

/**
 * @param {Object} result
 */
const parseBus = (result) => {
  return {
    id: result.lineId,
    timeLeft: parseTimeLeft(result.busTimeLeft)
  };
};

/**
 * @param {Array} results
 */
const formatResult = (results) => {
  return results.map((result) => {
    const busInfo = parseBus(result);
    return `${busInfo.id} in ${busInfo.timeLeft}`;
  }).join(', ');
};

const parseResults = (results, idStop) => {
  let result;

  if (results.length > 0) {
    result = `There are ${results.length} incoming ${results.length > 1 ? 'buses' : 'bus' }, ${formatResult(results)}`;
  } else {
    result = `There are no incoming buses for stop ${idStop}`;
  }

  return result;
};

module.exports = {
  welcome: (callback) => {
    const speechOutput = "Welcome to the Madrid's Public Transport skill";
    callback(speechOutput);
  },
  stopTimes: (idStop) => {
    return new Promise((resolve) => {
      let speechOutput = '';

      geo.getArriveStop({ idStop })
        .then((data) => {
          let results = [];

          if (data.arrives) {
            results = data.arrives;
            if (!data.arrives.length) {
              results = [data.arrives];
            }
          }

          speechOutput = parseResults(results, idStop);
          resolve(speechOutput);
        })
        .catch(() => {
          speechOutput = `I am sorry, error fetching bus stop ${idStop} info`;
          resolve(speechOutput);
        });
    });
  }
};
