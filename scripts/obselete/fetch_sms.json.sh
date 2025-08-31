#!/system/bin/sh
# This script is a temporary solution for fetching SMS messages from the inbox and saving them in JSON format. 
# It will become obsolete once I create a customized endpoint for MiFiService.
# Move this to "/system/bin/fetch_sms.json.sh" and set permissions to executable.


outfile="/data/data/com.mifiservice.hello/files/jetty2/json/sms.json"

echo "[" > "$outfile"

first=1

content query --uri content://sms/inbox --projection address:body:date | while read -r line; do
    address=$(echo "$line" | sed -n 's/.*address=\([^,]*\).*/\1/p')
    body=$(echo "$line" | sed -n 's/.*body=\(.*\), date=.*/\1/p')
    date=$(echo "$line" | sed -n 's/.*date=\(.*\)/\1/p')

    body=$(echo "$body" | sed 's/\\/\\\\/g; s/"/\\"/g')

    if [[ -n "$address" || -n "$body" ]]; then
        if [ $first -eq 0 ]; then
            echo "," >> "$outfile"
        fi
        echo "  {\"address\": \"${address}\", \"body\": \"${body}\", \"date\": \"${date}\"}" >> "$outfile"
        first=0
    fi
done

echo "]" >> "$outfile"

