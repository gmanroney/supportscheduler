/*jshint esversion: 6*/

var moment=require('moment');

function pickRandomDay ()
{
  // Return value between 0 and 9 for the 10 working days in a fortnight that
  // engineers need to be scheduled for support. 0=monday of week1, 5=monday of
  // week 2 etc.
  return Math.floor(Math.random() * 10);
}

function pickRandomShift ()
{
  // Return value between 0 and 1 for the part of day the engineer will provide
  // support; 0 = morning and 1 = afternoon
  return Math.floor(Math.random() * 2);
}

function calcStartPeriod (startw,starty)
{
  // Return start of period
  return moment(starty+'-01-01').startOf('week').startOf('day').week(startw);
}

function calcEndPeriod (startw,starty)
{
  // Return end of period
  return moment(starty+'-01-01').endOf('week').startOf('day').week(startw+1);
}

function assignEngineers (empids)
{
  // Main function to determine schedule. It is possible to fail to get a working schedule
  // so the application will 'retry' if it is not possible to get all slots to comply
  // with business rules.

  // create array to hold schedule information and initalize it with blank values
  var schedule = [];

  // loop through employees and assgin 2 half day shifts in the two week period
  retryloop = true;
  while (retryloop)
  {
    // Initialize the array & populated count
    for (i=0; i<10; i++)
    {
      schedule[i] = [ ];
      for (j=0; j<2; j++ )
      {
        schedule[i][j]="";
      }
    }
    populated = 0;

    // try to schedule engineers to slots in 2 week cycle according to business rules
    // stating that they only do 0.5 days a day, have at least 1 day in between shifts
    // and only do 1.0  days in a 10 day period (2 weeks, Monday to Friday)
    for (var k=0; k < empids.length; k++ )
    {
      // set unscheduled to 2 for worker initially
      unscheduled = 2;
      retrycount = 0;
      lastDayPicked = -1;

      // While there are unscheduled slots and retries less than 20 keep trying
      // to find a day for the engineer to work
      while (unscheduled > 0 && retrycount < 20 )
      {
        // generate random value for day and shift
        i = pickRandomDay();
        j = pickRandomShift();
        retrycount = retrycount + 1;

        // if shift is not assigned then check to see if engineer can be added
        if ( schedule[i][j] == "" )
        {
          // Initialise logical for checking business rules; set to FALSE which means no rule fire (initially);
          // if TRUE rule fires and allocation is not valid

          var businessRuleCheck=false;

          businessRuleCheck = ( unscheduled == 1 && lastDayPicked == i ) ? true : false;

          // check to see if previous or next day contains record for the engineer
          // if it does return false and try again
          if ( i == 0 )
          {
            businessRuleCheck = ( schedule[i][0] == empids[k].empid || schedule[i+1][1] == empids[k].empid ) ||
                              + ( schedule[i][0] == empids[k].empid || schedule[i+1][0] == empids[k].empid ) ||
                              + ( schedule[i][0] == empids[k].empid || schedule[i+1][1] == empids[k].empid ) ||
                              + ( schedule[i][0] == empids[k].empid || schedule[i+1][0] == empids[k].empid );
          } else if ( i > 0 && i < 9 )
          {
            businessRuleCheck = ( schedule[i][0] == empids[k].empid || schedule[i+1][0] == empids[k].empid ) ||
                              + ( schedule[i][0] == empids[k].empid || schedule[i+1][1] == empids[k].empid ) ||
                              + ( schedule[i][1] == empids[k].empid || schedule[i+1][0] == empids[k].empid ) ||
                              + ( schedule[i][1] == empids[k].empid || schedule[i+1][1] == empids[k].empid ) ||
                              + ( schedule[i][0] == empids[k].empid || schedule[i-1][0] == empids[k].empid ) ||
                              + ( schedule[i][0] == empids[k].empid || schedule[i-1][1] == empids[k].empid ) ||
                              + ( schedule[i][1] == empids[k].empid || schedule[i-1][0] == empids[k].empid ) ||
                              + ( schedule[i][1] == empids[k].empid || schedule[i-1][1] == empids[k].empid );
          } else
          {
            businessRuleCheck = ( schedule[i][0] == empids[k].empid || schedule[i-1][1] == empids[k].empid ) ||
                              + ( schedule[i][0] == empids[k].empid || schedule[i-1][0] == empids[k].empid ) ||
                              + ( schedule[i][1] == empids[k].empid || schedule[i-1][1] == empids[k].empid ) ||
                              + ( schedule[i][1] == empids[k].empid || schedule[i-1][0] == empids[k].empid );
          }

          if ( j == 0 && schedule[i][1] == empids[k].empid )
          {
            businessRuleCheck=true;
          }

          if ( j == 1 && schedule[i][0] == empids[k].empid )
          {
            businessRuleCheck=true;
          }

          // if engineer has not been assigned to yesterday or today then add to schedule
          if ( ! businessRuleCheck )
          {
            schedule[i][j] = empids[k].empid;
            unscheduled = unscheduled - 1;
            populated = populated + 1;
            lastDayPicked = i;

            // if all slots are now scheduled then exit the loop by setting retryschedule to false
            retryloop = ( populated ==  20 ) ? false : true;
          }

        }

      }

    }

  }

  // return schedule to calendar populating function
  return schedule;
}

function populateCalendar (theschedule,startyear,startweek)
{

  // Initialize array
  var scheduleDates = [];
  var calcSchedule = [];

  // Get start and end dates of 2-week period to be scheduled
  startweek = parseInt(startweek);
  var startOfSchedule = calcStartPeriod(startweek,startyear);
  var endOfSchedule = calcEndPeriod(startweek,startyear);
  var startOfSchedule_ms = startOfSchedule.toDate().getTime();
  var endOfSchedule_ms = endOfSchedule.toDate().getTime();

  // Difference in days
  var diffDays="";
  diffDays = (endOfSchedule_ms - startOfSchedule_ms);
  diffDays = Math.round(Math.abs(diffDays/86400000));

  var day = startOfSchedule;
  var genScheduleFlag = true;
  var todayDate = Date.now();

  // Do not generate schedule if in the past
  if ( todayDate > endOfSchedule_ms )
  {
    console.log('Schedule period requested in past. Not generated');
    genScheduleFlag = false;
  }

  // Do not generate schedule if today is in the middle of the requested schedule
  if ((todayDate > startOfSchedule_ms && (todayDate < endOfSchedule_ms )))
  {
    console.log('Todays date is during schedule period. Not generated.');
    genScheduleFlag = false;
  }

  // Extract the weekdays; assume engineers have to provide support
  // Monday-Friday regardless of whether there is a holiday or not
  weekDayCount = 0;
  while (day <= endOfSchedule)
  {
    dayOfWeek = day.toDate().getDay();
    if (( dayOfWeek > 0 ) && ( dayOfWeek < 6 ))
    {
      scheduleDates.push(day.toDate());
      weekDayCount++;
    }
    day = day.clone().add(1, 'd');
  }

  // Do not generate schedule if today is in the middle of the requested schedule
  if ( weekDayCount < 10 )
  {
    console.log('Less than 10 working days in period. Not generated.');
    genScheduleFlag = false;
  }

  if ( genScheduleFlag )
  {
    // Populate schedule collection with the entries calculated
    for (i=0; i<10; i++)
    {
      for (j=0; j<2; j++ )
      {
        var temp = {};
        temp.empid=theschedule[i][j];
        temp.date=scheduleDates[i];
        temp.shift=j;
        var yyyy = scheduleDates[i].getFullYear();
        var mm = scheduleDates[i].getMonth() + 1; // getMonth() is zero-based
        if (mm < 10) mm='0'+mm;
        var dd = scheduleDates[i].getDate();
        if (dd < 10) dd='0'+dd;
        temp.ymd=yyyy+'-'+mm+'-'+dd;
        temp.wn=moment(scheduleDates[i]).weeks();
        temp.yr=yyyy;
        calcSchedule.push(temp);
      }
    }
  }

  // Return JSON object containing schedule for population into database
  return calcSchedule;
}

module.exports = {
  pickRandomDay,
  pickRandomShift,
  assignEngineers,
  populateCalendar,
  calcStartPeriod,
  calcEndPeriod
};
