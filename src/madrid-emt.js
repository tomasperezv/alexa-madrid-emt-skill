module.exports = {
  welcome: (callback, buildSpeechletResponse) => {
    const cardTitle = 'Madrid Transport Skill';
    const speechOutput = "Welcome to the Madrid's EMT skill";

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, '', true));
  },
  stopTimes: (callback, buildSpeechletResponse) => {
    const cardTitle = 'Madrid Transport Skill';
    const speechOutput = "Stop times for line X";

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, '', true));
  }
};
