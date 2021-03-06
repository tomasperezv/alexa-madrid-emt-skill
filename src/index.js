const alexa = require('alexa-app');

const app = new alexa.app('alexa-madrid-emt'); // eslint-disable-line new-cap
const MadridEMT = require('./madrid-emt');

app.launch((request, response) => {
  const prompt = 'Please, tell me a bus stop number';
  response.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent(
  'GetNextTimesForAddress', {
    utterances: [
      'buses'
    ]
  },
  (request, response) => {
    response.card({
      type: 'AskForPermissionsConsent',
      permissions: ['read::alexa:device:all:address']
    });
  },
);

app.intent(
  'GetNextTimesForStop', {
    slots: {
      stop_id: 'AMAZON.NUMBER'
    },
    utterances: [
      'buses stop {stop_id}'
    ]
  },
  (request, response) => {
    const stopId = request.slot('stop_id');

    if (!isNaN(parseInt(stopId, 10))) {
      return MadridEMT
        .stopTimes(stopId)
        .then((result) => {
          response.say(result);
        });
    } else { // eslint-disable-line no-else-return
      const prompt = 'Please, tell me a bus stop number. For instance 70';
      response.say(prompt).shouldEndSession(false);
    }
  },
);

app.intent(
  'AMAZON.HelpIntent', {},
  (request, response) => {
    const prompt = 'Please, tell me a bus stop number. For instance 70';
    response.say(prompt).shouldEndSession(false);
  },
);

app.intent(
  'AMAZON.StopIntent', {},
  (request, response) => {
    const prompt = 'Goodbye';
    response.say(prompt).shouldEndSession(true);
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
