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

function assignEngineers ()
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

  var empids = [ "122", "123", "124", "125", "121", "120", "126", "127", "128", "129"];

  // loop through employees and assgin 2 half day shifts in the two week period
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
        schedule[i][j] = empids[k];
        console.log(`assigned worker with id ${empids[k]} to day = ${i} shift = ${j}`)
        unscheduled = unscheduled - 1;
      }
    }
  }
  // return schedule to calendar populating function
  return schedule;
}

function populateCalendar (theschedule,startweek)
{

  // Initialize array
  var scheduleDates = [];

  // Get start and end dates of 2-week period to be scheduled
  var startOfSchedule = moment().startOf('week').week(startweek);
  var endOfSchedule = moment().endOf('week').week(startweek+1);
  var day = startOfSchedule;

  // Extract the weekdays; assume engineers have to provide support
  // Monday-Friday regardless of whether there is a holiday or not
  while (day <= endOfSchedule) {
      dayOfWeek = day.toDate().getDay();
      if (( dayOfWeek > 0 ) && ( dayOfWeek < 6 ))
      {
        scheduleDates.push(day.toDate());
      }
      day = day.clone().add(1, 'd');
  }
  console.log(scheduleDates);

  // Populate schedule collection with the entries calculated
  for (i=0; i<10; i++)
  {
    for (j=0; j<2; j++ )
    {
      console.log(i,j,scheduleDates[i],theschedule[i][j]);
    }
  }
}
