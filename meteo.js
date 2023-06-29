/*set variables*/

const apiKey = "7cd75bbc6f9e309d722bde8f1cda24cc";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const urlConf = "&lang=fr&units=metric&appid=";
const urlIcon = "https://openweathermap.org/img/wn/";

const jsonUrl = './conf.json';

let intervalID;
let cycle = 1 * 3600;

function main() {
	/*data from json file*/
	fetch(jsonUrl)
		.then((resp) => resp.json())
		.then(function(data) {
			let	city = data.setup.city;
			let	url = apiUrl + city + urlConf + apiKey;
		
			/*data meteo*/
			fetch(url)
				.then((resp) => resp.json())
				.then(function(data) {
					displayWeather(data);
				})
				.catch(function(error) {
					console.log("Error with api");
					console.log(error);
				});
		})
		.catch(function(error) {
			console.log("Error with json file");
			console.log(error);
		});
}

function displayWeather(data) {

	let temp = data.main.temp;
	let city = data.name;
	let description = data.weather[0].description;
	let humidity = data.main.humidity;
	let feels_like = data.main.feels_like;
	let icon = data.weather[0].icon;

	document.querySelector(".temp").innerText = temp + " ºC";
	document.querySelector(".description").innerText = description;
	document.querySelector(".city").innerText = city;
	document.querySelector(".humidity").innerText = humidity + " %";
	document.querySelector(".feels_like").innerText = feels_like + " ºC";
	document.querySelector(".icon").src = urlIcon + icon + "@2x.png";
}

function repeatCycle(time) {
	intervalID = setInterval(main, 1000 * time);
}

main();
repeatCycle(cycle);
