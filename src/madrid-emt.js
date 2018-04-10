const EMT = require('emt-bus')(process.env.EMT_CLIENT_ID, process.env.EMT_KEY);
const geo = EMT('geo');

/**
 * @param {Number} time
 */
const parseTimeLeft = (time) => {
  return Math.floor(time/60);
};

const cardTitle = 'Madrid Public Transport Skill';

module.exports = {
  welcome: (callback, buildSpeechletResponse) => {
    const speechOutput = "Welcome to the Madrid's Public Transport skill";

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, '', true));
  },
  stopTimes: (callback, buildSpeechletResponse) => {
    let speechOutput = '';

    geo.getArriveStop({ idStop: '1350' })
      .then((data) => {
        const firstBus = {
          id: data.arrives[0].lineId,
          timeLeft: parseTimeLeft(data.arrives[0].busTimeLeft)
        };

        speechOutput = `Bus ${firstBus.id} arriving in ${firstBus.timeLeft}`;
        callback({}, buildSpeechletResponse(cardTitle, speechOutput, '', true));
      })
      .catch((data) => {
        speechOutput = `I am sorry, error fetching bus stop ${idStop} info`;
        callback({}, buildSpeechletResponse(cardTitle, speechOutput, '', true));
      });
  }
};
