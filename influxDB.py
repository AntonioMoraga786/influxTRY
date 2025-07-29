# code to add random timestamped data into innfluxDB
import os, time
import random
from influxdb_client_3 import InfluxDBClient3, Point


token = "TOKEN GOES HERE"
org = "Dev Team"
host = "https://us-east-1-1.aws.cloud2.influxdata.com"
client = InfluxDBClient3(host=host, token=token, org=org)

Database = "RANDOMDATA"

i = 0
while True:
    i += 1
    number = random.randint(0,10)
    data = {
        "DAY":"today",
        "VAL": number,
        }

    point = (Point("RANDOM")
            .tag("DAY", data["DAY"])
            .field("VAL",data["VAL"]))
        
    client.write(database = Database, record = point)
    time.sleep(60)
    print(f"writing {i} complete")