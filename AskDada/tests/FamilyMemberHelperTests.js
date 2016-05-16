var assert = require('assert');
var familyMemberHelper = require("../FamilyMemberHelper");

describe('Family Member Helper', function() {
    it('WhoseTurnIsItForSongs', function () {
        
        var f = familyMemberHelper.getFamilyMemberForDate();

        assert.equal(f, "Canaan");
    })

})
