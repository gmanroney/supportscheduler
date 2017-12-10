//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Import models and database connector
var mongoose = require("mongoose");
var Engineer = require('../models/engineer');

//Require the dev-dependencies
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var assert = chai.assert;
var done = chai.done;
var chaiHttp = require('chai-http');
var server = require('../src/server');
chai.use(chaiHttp);
chai.use(require('chai-moment'));

// Import the functions we are testing
var ssf = require("../functions/supportSched_functions");

//Our parent block
describe('API: Engineer', () => {
  beforeEach((done) =>  { //Before each test we empty the database
    Engineer.remove({}, (err) => {
      done();
    });
  });

  // Test the /GET route
  describe('Testing /GET engineers', () => {
    it('It should get all of the engineers', (done) => {
      chai.request(server)
      .get('/api/engineers')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });

  //Test the /POST route
  describe('Testing /POST engineers', () => {
    it('It should create an engineer (all fields required)', (done) => {
      let engineer =
      {
        empid: "18223",
        gender: "M",
        lname: "Polonei",
        fname: "Gerard",
        start: "2011-01-1",
        dob: "199-01-02"
      }
      chai.request(server)
      .post('/api/engineers')
      .send(engineer)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.message.should.equal('Engineer record created successfully');
        done();
      });
    });
  });

  //Test the /DELETE route
  describe('Testing /DELETE engineers', () => {
    it('It should delete all engineers', (done) => {
      chai.request(server)
      .delete('/api/engineers')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.message.should.equal('All engineer records deleted');
        done();
      });
    });
  });

});

describe('Scheduler', function()
{
	describe('Date Calculator For Work Weeks', function()
	{
		it ("Return first workday date of day 1 week 1 2017", function()
		{
			var wk_1_2017 = ssf.calcStartPeriod (1,2017);
			theDate = [2017,0,1];
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
			theDate = [2017,0,14];
			assert.sameMoment(theDate, wk_1_2017);
		});
		it ("Return last workday date of day 1 week 52 2017", function()
		{
			var wk_52_2017 = ssf.calcEndPeriod (52,2017);
			theDate = [2018,0,6];
			assert.sameMoment(theDate, wk_52_2017);
		});
		it ("Return last workday date of day 1 week 1 2018", function()
		{
			var wk_1_2018 = ssf.calcEndPeriod (1,2018);
			theDate = [2018,0,13];
			assert.sameMoment(theDate, wk_1_2018);
		});
		it ("Return last workday date of day 1 week 52 2018", function()
		{
			var wk_52_2018 = ssf.calcEndPeriod (52,2018);
			theDate = [2019,0,5];
			assert.sameMoment(theDate, wk_52_2018);
		});
		it ("Return last workday date of day 1 week 1 2019", function()
		{
			var wk_1_2019 = ssf.calcEndPeriod (1,2019);
			theDate = [2019,0,12];
			assert.sameMoment(theDate, wk_1_2019);
		});
		it ("Return last workday date of day 1 week 52 2019", function()
		{
			var wk_52_2019 = ssf.calcEndPeriod (52,2019);
			theDate = [2020,0,4];
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

		var engineerIDs = [{ "empid" : 121 },{ "empid" : 122 },{ "empid" : 123 },{ "empid" : 124 }, { "empid" : 125 },{ "empid" : 126 },{ "empid" : 127 },{ "empid" : 128 }, { "empid" : 129 },{ "empid" : 130 }];
		results = ssf.assignEngineers(engineerIDs);

		// intialise array
		var hours = {};
		for (i=121; i<131; i++)
		{
			hours[i] = 0;
		}

		// aggregate hours by engineer
		for (i=0; i<10; i++)
		{
			for (j=0; j<2; j++ )
			{
				x = results[i][j];
				hours[x] = hours[x] + 0.5;
			}
		}

		it ("Only one of the engineers listed in the database can be assigned to a shift", function() {
			for (i=0; i<10; i++)
			{
				for (j=0; j<2; j++ )
				{
					expect(results[i][j]).to.be.at.least(121);
					expect(results[i][j]).to.be.at.most(130);
				}
			}
		});

		it ("There are no unfilled shifts in a 10 day (2 week) peroiod", function() {
			for (i=0; i<10; i++)
			{
				for (j=0; j<2; j++ )
				{
					expect(results[i][j]).not.to.equal(null);
				}
			}
		});

		it ("There are no engineers without 0.0 days assignment in a 10 day (2 week) period", function() {
			for (i=121; i<131; i++)
			{
				expect(hours[i]).to.equal(1);
			}
		});

		it ("There are no engineers with only 0.5 days assignment in a 10 day (2 week) period", function() {
			for (i=121; i<131; i++)
			{
				expect(hours[i]).not.equal(0.5);
			}
		});

		it ("There are no engineers with > 1.0 days assignment in a 10 day (2 week) period", function() {
			for (i=121; i<131; i++)
			{
				expect(hours[i]).not.greaterThan(1);
			}
		});

		it ("An engineer can do at most one half day shift in a day", function() {
			for (i=0; i<10; i++)
			{
				expect(results[i][0]).not.to.equal(results[i][1]);
			}
		});

		it ("An engineer cannot have a shift on two consecutive days [day 1 & 2 tests]", function() {
			expect(results[0][0]).not.to.equal(results[1][0]);
			expect(results[0][0]).not.to.equal(results[1][1]);
			expect(results[0][1]).not.to.equal(results[1][0]);
			expect(results[0][1]).not.to.equal(results[1][1]);
		});

		it ("An engineer cannot have a shift on two consecutive days [day 2 to 9 tests]", function() {
			for (var i=1; i < results.length - 1 ; i++)
			{
				expect(results[i][0]).not.to.equal(results[i+1][0]);
				expect(results[i][0]).not.to.equal(results[i+1][1]);
				expect(results[i][1]).not.to.equal(results[i+1][0]);
				expect(results[i][1]).not.to.equal(results[i+1][1]);
				expect(results[i][0]).not.to.equal(results[i-1][0]);
				expect(results[i][0]).not.to.equal(results[i-1][1]);
				expect(results[i][1]).not.to.equal(results[i-1][0]);
				expect(results[i][1]).not.to.equal(results[i-1][1]);
			}
		});

		it ("An engineer cannot have a shift on two consecutive days [day 9 & 10 tests]", function() {
			expect(results[9][0]).not.to.equal(results[8][0]);
			expect(results[9][0]).not.to.equal(results[8][1]);
			expect(results[9][1]).not.to.equal(results[8][0]);
			expect(results[9][1]).not.to.equal(results[8][1]);
		});

		//describe('Populating Calendar', function()
		//{
//
	//	});
	});
});

// Kill the server to end the unit testing
after(function () {
  process.exit(0);
});
