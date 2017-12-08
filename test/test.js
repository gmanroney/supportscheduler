var chai = require('chai');
var expect = chai.expect;
var should = chai.should;
var assert = chai.assert;
var done = chai.done;
chai.use(require('chai-moment'));
var moment=require('moment');
var ssf = require("../functions/supportSched_functions");

describe('Scheduler', function()
{
	describe('Date Calculator For Work Weeks', function()
	{
		it ("Return first workday date of day 1 week 1 2017", function()
		{
			var wk_1_2017 = ssf.calcStartPeriod (1,2017);
			theDate = [2017,00,01];
			assert.sameMoment(theDate, wk_1_2017);
		});
		it ("Return first workday date  of day 1 week 52 2017", function()
		{
			var wk_52_2017 = ssf.calcStartPeriod (52,2017);
			theDate = [2017,11,24];
			assert.sameMoment(theDate, wk_52_2017);
		});
		it ("Return first workday date of day 1 week 1 2018", function()
		{
			var wk_1_2018 = ssf.calcStartPeriod (1,2018);
			theDate = [2017,11,31];
			assert.sameMoment(theDate, wk_1_2018);
		});
		it ("Return first workday date of day 1 week 52 2019", function()
		{
			var wk_52_2018 = ssf.calcStartPeriod (52,2018);
			theDate = [2018,11,23];
			assert.sameMoment(theDate, wk_52_2018);
		});
		it ("Return first workday date of day 1 week 1 2019", function()
		{
			var wk_1_2019 = ssf.calcStartPeriod (1,2019);
			theDate = [2018,11,30];
			assert.sameMoment(theDate, wk_1_2019);
		});
		it ("Return first workday date of day 1 week 52 2019", function()
		{
			var wk_52_2019 = ssf.calcStartPeriod (52,2019);
			theDate = [2019,11,22];
			assert.sameMoment(theDate, wk_52_2019);
		});

		it ("Return last workday date of day 1 week 1 2017", function()
		{
			var wk_1_2017 = ssf.calcEndPeriod (1,2017);
			theDate = [2017,00,14];
			assert.sameMoment(theDate, wk_1_2017);
		});
		it ("Return last workday date of day 1 week 52 2017", function()
		{
			var wk_52_2017 = ssf.calcEndPeriod (52,2017);
			theDate = [2018,00,06];
			assert.sameMoment(theDate, wk_52_2017);
		});
		it ("Return last workday date of day 1 week 1 2018", function()
		{
			var wk_1_2018 = ssf.calcEndPeriod (1,2018);
			theDate = [2018,00,13];
			assert.sameMoment(theDate, wk_1_2018);
		});
		it ("Return last workday date of day 1 week 52 2018", function()
		{
			var wk_52_2018 = ssf.calcEndPeriod (52,2018);
			theDate = [2019,00,05];
			assert.sameMoment(theDate, wk_52_2018);
		});
		it ("Return last workday date of day 1 week 1 2019", function()
		{
			var wk_1_2019 = ssf.calcEndPeriod (1,2019);
			theDate = [2019,00,12];
			assert.sameMoment(theDate, wk_1_2019);
		});
		it ("Return last workday date of day 1 week 52 2019", function()
		{
			var wk_52_2019 = ssf.calcEndPeriod (52,2019);
			theDate = [2020,00,04];
			assert.sameMoment(theDate, wk_52_2019);
		});

	});
	describe('Random day and shift Calculator', function()
	{
		it ("Random day of 10 day period test (0-9)", function()
		{
			var random_day = ssf.pickRandomDay();
			expect(random_day).to.be.at.least(0);
			expect(random_day).to.be.at.most(9);
		});

		it ("Random shift test (0-1)", function()
		{
			var random_shift = ssf.pickRandomShift();
			expect(random_shift).to.be.at.least(0);
			expect(random_shift).to.be.at.most(1);
		});
	});

	describe('Business Rules For Scheduling', function()
	{

		it ("An engineer can do at most one half day shift in a day", function() {

		});

		it ("An engineer cannot have half day shifts on consecutive days", function() {

		});

		it ("Each engineer should have completed one whole day of support in any 2 week period", function() {

		});

	});

});
