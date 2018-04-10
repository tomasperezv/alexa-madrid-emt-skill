const EMT = require('emt-bus')(process.env.EMT_CLIENT_ID, process.env.EMT_KEY);
const bus = EMT('bus');

module.exports = (callback, buildSpeechletResponsed) => {
  // If we wanted to initialize the session to have some attributes we could add those here.
  const sessionAttributes = {};
  const cardTitle = 'Welcome';
  const speechOutput = 'Welcome to the Alexa Skills Kit sample. ' +
    'Please tell me your favorite color by saying, my favorite color is red';
  // If the user either does not reply to the welcome message or says something that is not
  // understood, they will be prompted again with this text.
  const repromptText = 'Please tell me your favorite color by saying, ' +
    'my favorite color is red';
  const shouldEndSession = false;

  callback(sessionAttributes,
    buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}
