const input = document.getElementById("TOKEN");
const update = document.getElementById("ready");
const output = document.getElementById("data-wrapper");

const updateData = () => {
    output.innerHTML = ""
    // define constants

    const token = input.value;// get token
    const org = "Dev Team";
    const host = "https://us-east-1-1.aws.cloud2.influxdata.com";
    const fluxQuery = `from(bucket: "RANDOMDATA")
        |> range(start: -1h)`

    fetch(`${host}/api/v2/query?org=${org}`, {
        method: "POST",
        headers: {
            "Authorization" : `Token ${token}`,
            "Content-Type": "application/vnd.flux",
            "Accept": "application/csv",  
        },
        body: fluxQuery,
    })
    .then(res => res.text())
    .then(data => {
        const response = data;
        // the data is fetched and is stored in the response variable
        var records = response
        .split("\n")
        .filter(line => line.trim() !== "");// split data into records
        const headers = records[0].split(",");
        records = records.slice(1);

        const timeIndex = headers.indexOf("_time");
        const valIndex = headers.indexOf("_value");
        
        for (const record of records) {
            const items = record.split(",");
            const OUT = `${items[valIndex]}---${items[timeIndex]}`
            
            // add each record to the results space
            output.innerHTML += `<div class="record">
                <p>${OUT}</p>
            </div>`
        };
    })
    .catch(console.error);
};

update.addEventListener("click",updateData);