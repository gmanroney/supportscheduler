#!/bin/bash

# REST calls to generate schedules for several years

# Configuration - NONE
rest_url="http://localhost:3000/api/schedules"

# Main loop

year=2018
while (( year < 2021 ))
do
   weeknumber=1
   while (( weeknumber < 52 ))
   do
      curl -X POST -H "Content-Type: application/json" ${rest_url}/${year}/${weeknumber}
      (( weeknumber = weeknumber + 2 ))
      echo
      echo "`date` : Generated schedule for week ${weeknumber} year ${year}"
   done
   (( year = year + 1 ))
done

# Exit script
exit 0
