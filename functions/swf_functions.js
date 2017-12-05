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

function caclStartPeriod (startw,starty)
{
  // Return start of period
  return moment(starty+'-01-01').startOf('week').week(startw);
}

function caclEndPeriod (startw,starty)
{
  // Return end of period
  return moment(starty+'-01-01').endOf('week').week(startw+1);
}

function assignEngineers (empids)
{
  // create array to hold schedule information and initalize it with blank values
  var schedule = new Array(10);
  for (i=0; i<10; i++)
  {
    schedule[i] = [ ];
    for (j=0; j<2; j++ )
    {
      schedule[i][j]="";
    }
  }

  // loop through employees and assgin 2 half day shifts in the two week period
  //typeof empids;
  for (var k=0; k < empids.length; k++ )
  {
    // set unscheduled to 2 for worker initially
    unscheduled = 2;
    while (unscheduled > 0)
    {
      // generate random value for day and shift
      i = pickRandomDay();
      j = pickRandomShift();

      // if shift is not assigned then add worker and decrease unscheduled by 1
      if ( schedule[i][j] === "" )
      {
        schedule[i][j] = empids[k].empid;
        unscheduled = unscheduled - 1;
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
  var startOfSchedule = caclStartPeriod(startweek,startyear);
  var endOfSchedule = caclEndPeriod(startweek,startyear);
  var startOfSchedule_ms = startOfSchedule.toDate().getTime();
  var endOfSchedule_ms = endOfSchedule.toDate().getTime();
  var diffDays = (endOfSchedule_ms - startOfSchedule_ms);
  var diffDays = Math.round(Math.abs(diffDays/86400000));
  var day = startOfSchedule;
  var genScheduleFlag = true;
  var todayDate = Date.now();

  // Do not generate schedule if in the past
  if ( todayDate > endOfSchedule_ms )
  {
    console.log('Schedule period requested in past. Not generated');
    genScheduleFlag = false;
  };

  // Do not generate schedule if today is in the middle of the requested schedule
  if ((todayDate > startOfSchedule_ms && (todayDate < endOfSchedule_ms )))
  {
    console.log('Todays date is during schedule period. Not generated.');
    genScheduleFlag = false;
  };

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
  };

  if ( genScheduleFlag )
  {
    // Populate schedule collection with the entries calculated
    for (i=0; i<10; i++)
    {
      for (j=0; j<2; j++ )
      {
        var temp = {};
        temp['empid']=theschedule[i][j];
        temp['date']=scheduleDates[i];
        temp['shift']=j;
        var yyyy = scheduleDates[i].getFullYear();
        var mm = scheduleDates[i].getMonth() + 1; // getMonth() is zero-based
        if (mm < 10) mm='0'+mm;
        var dd = scheduleDates[i].getDate();
        if (dd < 10) dd='0'+dd;
        temp['ymd']=yyyy+'-'+mm+'-'+dd;
        temp['wn']=moment(scheduleDates[i]).weeks();
        temp['yr']=yyyy;
        calcSchedule.push(temp);
        typeof scheduleDates[i];
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
  caclStartPeriod,
  caclEndPeriod
}
