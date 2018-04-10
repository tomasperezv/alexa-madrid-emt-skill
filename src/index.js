const Core = require('./core');
const RequestTypes = require('./request-type');

exports.handler = (event, context, callback) => {
  try {
    console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

    /**
     * Prevent someone else from configuring a skill that sends requests to this function.
     */
    if (proces.env.APP_ID && event.session.application.applicationId !== process.env.APP_ID) {
      callback('Invalid Application ID');
    }

    if (event.session.new) {
      Core.onSessionStarted({ requestId: event.request.requestId }, event.session);
    }

    if (event.request.type === RequestType.LAUNCH) {
      onLaunch(event.request,
        event.session,
        (sessionAttributes, speechletResponse) => {
          callback(null, Core.buildResponse(sessionAttributes, speechletResponse));
        });
    } else if (event.request.type === RequestType.INTENT) {
      Core.onIntent(event.request,
        event.session,
        (sessionAttributes, speechletResponse) => {
          callback(null, Core.buildResponse(sessionAttributes, speechletResponse));
        });
    } else if (event.request.type === RequestType.SESSION_ENDED) {
      Core.onSessionEnded(event.request, event.session);
      callback();
    }
  } catch (err) {
    callback(err);
  }
};
