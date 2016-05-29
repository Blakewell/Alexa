
'use strict';

var AlexaSkill = require('./AlexaSkill');
var FamilyMemberHelper = require("./FamilyMemberHelper");

var APP_ID =  undefined; //'amzn1.echo-sdk-ams.app.05c3799b-34b4-4fd8-9d1a-a8af9beb188a'; 

var AskDadaHelper = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
AskDadaHelper.prototype = Object.create(AlexaSkill.prototype);
AskDadaHelper.prototype.constructor = AskDadaHelper;

AskDadaHelper.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to the Ask Dada Helper. You can ask a question like, Whose turn is it for songs ... Now, what can I help you with.";
    var repromptText = "";
    response.ask(speechText, repromptText);
};

AskDadaHelper.prototype.intentHandlers = {
	"WhoseTurnForSongsIntent": function (intent, session, response) {
        
        var epochDateSlider = 0;
        var tense = "is";
        
        var day = "today";
        if (intent.slots) {
            var daySlot = intent.slots.DayOfWeek;
            if (daySlot && daySlot.value){
                day = daySlot.value.toLowerCase();
                if (day == "yesterday") {
                    tense = "was";
                }
            }
        }
        
        var familyMember = FamilyMemberHelper.getFamilyMemberForDay(day, ["Dada", "Mama", "Canaan", "Eden"]);
        
        var speechText = "";
        speechText = "It " + tense + " " + familyMember + "s turn for songs " + day;

        response.tellWithCard(speechText, "Whose Turn Is It?", speechText);
    },
	
	"HelloWorldIntent": function (intent, session, response) {
        response.tellWithCard("Hello there!", "Greeter", "Hello there!");
    },

};

exports.handler = function (event, context) {
    var askDadaHelper = new AskDadaHelper();
    askDadaHelper.execute(event, context);
};
