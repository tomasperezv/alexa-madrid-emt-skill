const EMT = require('emt-bus')(process.env.EMT_CLIENT_ID, process.env.EMT_KEY);
const bus = EMT('bus');

bus.getListLines('10/04/2018', '133')
  .then(function(err, data) {
    console.log('WE HAVE DATA');
    console.log(data);
  })
  .catch(function(error) {
    console.log('SOMETHING HAPPENED');
    console.log(error);
  });

module.exports = (callback, buildSpeechletResponse) => {
  const cardTitle = 'Madrid Transport Skill';
  const speechOutput = "Welcome to the Madrid's EMT skill";

  callback(sessionAttributes,
    buildSpeechletResponse(cardTitle, speechOutput, repromptText, true));
}
