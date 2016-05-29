var assert = require('assert');
var familyMemberHelper = require("../FamilyMemberHelper");

describe('Family Member Helper', function() {
    it('DaysSinceEpochDate', function () {
        
        var daysSinceEpochDateExpected = 4; 
        var todaysDate = new Date();
        
        var epochDate = familyMemberHelper.getLocalDate(new Date(todaysDate.setDate(todaysDate.getDate() - daysSinceEpochDateExpected)),-6);
        
        var daysSinceEpochDateActual = familyMemberHelper.getDaysSinceEpochDateTillToday(epochDate);
        
        assert.equal(daysSinceEpochDateActual, daysSinceEpochDateExpected);
    })
    it("WhoseTurnForDay", function () {
        var family = ["Dada", "Mama", "Canaan", "Eden"];

        var nullDayPerson = familyMemberHelper.getFamilyMemberForDay(null, family);
        assert.notEqual(nullDayPerson, undefined);

        var undefinedDayPerson = familyMemberHelper.getFamilyMemberForDay(undefined, family);
        assert.notEqual(undefinedDayPerson, undefined);

        var tomorrowPerson = familyMemberHelper.getFamilyMemberForDay("tomorrow", family);
        assert.notEqual(tomorrowPerson, undefinedDayPerson);

        var yesterdayPerson = familyMemberHelper.getFamilyMemberForDay("yesterday", family);
        assert.notEqual(yesterdayPerson, tomorrowPerson);
    })

    it("WhoseTurn", function () { 

        var family = ["Dada", "Mama", "Canaan", "Eden"];

        var actualPerson = familyMemberHelper.getFamilyMemberForDate(0, family);
        assert.equal(actualPerson, "Dada");

        actualPerson = familyMemberHelper.getFamilyMemberForDate(1, family);
        assert.equal(actualPerson, "Mama");

        actualPerson = familyMemberHelper.getFamilyMemberForDate(2, family);
        assert.equal(actualPerson, "Canaan");

        actualPerson = familyMemberHelper.getFamilyMemberForDate(3, family);
        assert.equal(actualPerson, "Eden");

        actualPerson = familyMemberHelper.getFamilyMemberForDate(4, family);
        assert.equal(actualPerson, "Dada");


        actualPerson = familyMemberHelper.getFamilyMemberForDate(5, family);
        assert.equal(actualPerson, "Mama");

    })


})
