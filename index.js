// 0ef0928a864cf8fbdcf0df02d6d7d49d
// https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=0ef0928a864cf8fbdcf0df02d6d7d49d

{/* <i class="fa-solid fa-sun-bright"></i> */ }

const http = require("http");
const requests = require("requests");
const fs = require("fs");

const htmlFile = fs.readFileSync(__dirname + "/index.html", "utf-8");

const replaceHtml = (orgHtml, weatherData) => {
    let file = orgHtml.replace("{%cityname%}", weatherData.name);

    file = file.replace("{%country%}", weatherData.sys.country);

    file = file.replace("{%tempValue%}", weatherData.main.temp_max);

    file = file.replace("{%tempMinValue%}", weatherData.main.temp_min);

    file = file.replace("{%tempMaxValue%}", weatherData.main.temp_max);

    file = file.replace("{%condition%}", weatherData.weather[0].main);

    file = file.replace("{%description%}", weatherData.weather[0].description.toUpperCase());


    return file;
}

const server = http.createServer((req, res) => {
    requests("https://api.openweathermap.org/data/2.5/weather?q=delhi&units=metric&appid=0ef0928a864cf8fbdcf0df02d6d7d49d")
        .on("data", (chunkData) => {
            const objData = JSON.parse(chunkData);
            const arrData = [objData];
            const newArray = arrData.map(item => replaceHtml(htmlFile, item)).join("");

            res.write(newArray)
        })
        .on("end", (err) => {
            if (err) return console.log(err)
            res.end();
        })
}
)

server.listen(8000, "127.0.0.1", () => {
    console.log("Server is running on Port 8000");
});