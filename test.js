var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var now = require('performance-now');
var avg = require('./index');

describe('with valid numbers', function() {
    var val;
    beforeEach(function() {
        avg([1, 20, 34.45, 57.23, 37, 25], function(r) {
            val = r;
        })
    });
    it('should return a number', function() {
        expect(val).to.be.a('number');
    });
    it('should be correct', function() {
        assert.equal(val, 29.113333333333333);
    });
});

describe('with stringified number', function() {
    var val;
    beforeEach(function() {
        avg(["2", "3", "7", "9"], function(r) {
            val = r;
        })
    });
    it('should return a number', function() {
        expect(val).to.be.a('number');
    });
    it('should return the correct value', function() {
        expect(val).to.eq(5.25);
    })
});

describe('with different value types', function() {
    var val;
    beforeEach(function() {
        avg([1, "2", "d"], function(r) {
            val = r;
        })
    });
    it('should return NaN', function() {
        expect(val).not.to.eq(val);
    })
});

describe('with a fairly large number of values', function() {
    var val;
    var numNums = 10000;
    var randomArray = new Array(numNums);
    var i = 0;
    while (i < numNums) {
        randomArray[i] = Math.random() * 100;
        i++;
    }

    var calculatedAverage = randomArray.reduce(function(sum, each) {
        return sum + each;
    }) / numNums;

    beforeEach(function() {
        avg(randomArray, function(r) {
            val = r;
        })
    });
    it('should return the correct value', function() {
        expect(val).to.eq(calculatedAverage);
    })
});

describe('cpp function performance time', function() {
    var val;
    var numNums = 10000;
    var randomArray = new Array(numNums);
    var i = 0;
    var jsElapsedTime, cppElapsedTime;
    var cpp0, cpp1, js0, js1;
    while (i < numNums) {
        randomArray[i] = Math.random() * 100;
        i++;
    }

    js0 = now();
    var calculatedAverage = randomArray.reduce(function(sum, each) {
            return sum + each;
        }) / numNums;
    js1 = now();

    jsElapsedTime = js1 - js0;


    beforeEach(function() {
        cpp0 = now();
        avg(randomArray, function(r) {
            cpp1 = now();
        })
    });
    it('should always be faster than the JS implementation', function() {
        expect(cpp1 - cpp0).to.be.lessThan(jsElapsedTime);
    })
});