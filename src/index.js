const alexa = require('alexa-app');

const app = new alexa.app('alexa-madrid-emt'); // eslint-disable-line new-cap
const MadridEMT = require('./madrid-emt');

app.launch((request, response) => {
  const prompt = 'Please, tell me a bus stop number';
  response.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent(
  'GetNextTimesForStop', {
    slots: {
      stop_id: 'AMAZON.NUMBER',
    },
    utterances: [
      'buses stop {stop_id}',
    ],
  },
  (request, response) => {
    const stopId = request.slot('stop_id');

    return MadridEMT
      .stopTimes(stopId)
      .then((result) => {
        response.say(result);
      });
  },
);

app.intent(
  'AMAZON.CancelIntent', {},
  (request, response) => {
    const prompt = 'Goodbye';
    response.say(prompt).shouldEndSession(true);
  },
);

if (process.env.APP_DEV) {
  module.exports = app;
} else {
  // connect the alexa-app to AWS Lambda
  exports.handler = app.lambda();
}
