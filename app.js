const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})
app.post("/", function (req, res) {
    var n1 = req.body.cityname;
    const q = n1
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&appid=01ccfae9089cfc107cf67aadbe079fd9&units=metric";
    https.get(url, function (response) {
        console.log(response);
        response.on("data", function (data) {
            const wheatherdata = JSON.parse(data);
            const temp = wheatherdata.weather[0].description;
            const wd = wheatherdata.main.temp;
            const icon = wheatherdata.weather[0].icon;
            const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(temp);
            res.write("<h1>The Condition is " + temp + " not </h1>");
            res.write("<h2>The Temperature at "+q+" is " + wd + " degree celsius</h2> ");
            res.write("<img src='" + image + "'>");
            res.send();
            res.end();
            // res.send("The Tempr is" + wd);
        })
    })
})
app.listen(3000, function () {
    console.log("Server has Started")
})