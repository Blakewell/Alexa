
'use strict';

var AlexaSkill = require('./AlexaSkill');

var APP_ID =  undefined; //'amzn1.echo-sdk-ams.app.05c3799b-34b4-4fd8-9d1a-a8af9beb188a'; 

var AskDadaHelper = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
AskDadaHelper.prototype = Object.create(AlexaSkill.prototype);
AskDadaHelper.prototype.constructor = AskDadaHelper;

AskDadaHelper.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to the Ask Dada Helper. You can ask a question like, Whose turn is it for songs ... Now, what can I help you with.";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechText, repromptText);
};

AskDadaHelper.prototype.intentHandlers = {
	"WhoseTurnForSongsIntent": function (intent, session, response) {		
		
		var family = ["Dada", "Mama", "Canaan", "Eden"];

		var todaysDate = new Date();
		var epochDate = new Date(2016,1, 5);
		var msDay = 60*60*24*1000;

		var numDaysSinceEpoch = Math.floor((todaysDate - epochDate) / msDay);
		var idx = numDaysSinceEpoch % 4;

		var speechText = "It is " + family[idx] + "s turn for songs"

        response.tellWithCard(speechText, "Whose Turn Is It?", speechText);
    },
	
	"HelloWorldIntent": function (intent, session, response) {
        response.tellWithCard("Hello there!", "Greeter", "Hello there!");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask questions to dada such as, Whose turn is it for songs?";
        var repromptText = "You can say things like, Is it my turn for songs?... Now, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};

exports.handler = function (event, context) {
    var askDadaHelper = new AskDadaHelper();
    askDadaHelper.execute(event, context);
};
