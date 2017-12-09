#!/bin/bash

# Write data from a csv file to a database using DELETE and POST commands

# Configuration

data_file="./createEngineers.csv"
rest_url="http://localhost:3000/api/engineers"

# Main loop
cat ${data_file} | while read ENTRY
do
        # Parse input file
	fname=`echo $ENTRY | cut -d ":" -f 1`
	lname=`echo $ENTRY | cut -d ":" -f 2`
	gender=`echo $ENTRY | cut -d ":" -f 3`
	empid=`echo $ENTRY | cut -d ":" -f 4`
	dob=`echo $ENTRY | cut -d ":" -f 5`
	start=`echo $ENTRY | cut -d ":" -f 6`
        echo "Read record: $fname $lname $gender $empid $dob $start"

        # Delete record for this employee ID if it exists
	curl -X DELETE -H "Content-Type: application/json" ${rest_url}/${empid}
	echo
        echo "Record deleted for ${empid}"

        # Create new record with imported data
	curl -X POST -H "Content-Type: application/json" --data '{ "fname": "'"${fname}"'", "lname": "'"${lname}"'", "gender": "'"${gender}"'", "empid": "'"${empid}"'", "dob": "'"${dob}"'", "start": "'"${start}"'"  }' ${rest_url} 
	echo
        echo "New record created for ${empid}"
done

# Exit script
exit 0
