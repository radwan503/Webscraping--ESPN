// file

let fs = require("fs");
let fetch = fs.readFileSync("./jsonexcel.json");
let data = JSON.parse(fetch);

console.log("read file" + data);

data.push({
   "name": "Saif",
   "lastName": "minhaj",
   "friends": ["robel", "mohin", "mokbul"],
   "age": 25,
   "address": {
      "city": "dhaka",
      "state": "cumilla"
   }
})

let writeData = JSON.stringify(data);
fs.writeFileSync('jsonexcel.json', writeData);


// xlsx 

let xlsx = require("xlsx")

