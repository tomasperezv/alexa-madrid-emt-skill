const EMT = require('emt-bus')(process.env.EMT_CLIENT_ID, process.env.EMT_KEY);
const geo = EMT('geo');

/**
 * @param {Number} time
 */
const parseTimeLeft = (time) => {
 if (time < 60) {
   return `${time} seconds`
 } else {
   return `${Math.floor(time/60)} minutes`;
 }
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

const parseResults = (results, idStop) => {
  if (results.length > 0) {
    const firstBus = parseBus(results[0]);
    if (results.length > 1) {
      const secondBus = parseBus(results[1]);
      return `There are ${results.length} buses incoming: ${firstBus.id} in ${firstBus.timeLeft}, ${secondBus.id} in ${secondBus.timeLeft}`;
    } else {
      return `Bus ${firstBus.id} arriving in ${firstBus.timeLeft}`;
    }
  } else {
    return `There are no incoming buses for stop ${idStop}`;
  }
};

const cardTitle = 'Madrid Public Transport Skill';

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
        .catch((data) => {
          speechOutput = `I am sorry, error fetching bus stop ${idStop} info`;
          resolve(speechOutput);
        });
    });

  }
};
