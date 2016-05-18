exports.getFamilyMemberForDate = function (daysSinceEpoch, familyMembers) {
    var idx = daysSinceEpoch % familyMembers.length;
    return familyMembers[idx];
}

exports.getDaysSinceEpochDateTillToday = function (epochDate) {

	var todaysDate = new Date();
	var msDay = 60*60*24*1000;

	return Math.floor((todaysDate - epochDate) / msDay);
}

exports.getFamilyMemberForDay = function (day, familyMembers) {
    
    var epochDateSlider = 0;
    
    if (day) {
        if (day.toLowerCase() == "tomorrow") {
            epochDateSlider = 1;
        }
        else if (day.toLowerCase() == "yesterday") { 
            epochDateSlider = -1;
        }
    }
        
    var daysSinceEpoch = exports.getDaysSinceEpochDateTillToday(new Date(2016, 1, 5)) + epochDateSlider;
    return exports.getFamilyMemberForDate(daysSinceEpoch, familyMembers);
}