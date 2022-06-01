var searchButton = document.getElementById("searchButton")
var key = 'dKli27YVN1Xw6LHvN9NAyhYR5dEydVxXXojInFquj2ZIyetfC6'
var secret = 'x2rtjtX1uuWWLBsSomBt1QHVNtXtjTBnL5EoGWLr'
var token, tokenType;
var tag = document.createElement("p")

document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.modal');
	var instances = M.Modal.init(elems);
	var factBtn = document.getElementById("cat-fact-btn")

	factBtn.addEventListener('click', getCatFact)
	modalCloseBtn.addEventListener("click")

});

function getCatFact() {
	fetch(
		'https://cat-fact.herokuapp.com/facts'
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {

				var element = document.getElementById("cat-fact");
				element.textContent = data[Math.floor(Math.random() * data.length)].text
			}
		});
}


function getAccessToken() {
	fetch('https://api.petfinder.com/v2/oauth2/token', {
		method: 'POST',
		body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}).then(function (response) {
		// Return the response as JSON
		return response.json();
	}).then(function (data) {
		// Log the API data
		console.log('token', data);
		// Store token data
		token = data.access_token;
		tokenType = data.token_type;
	}).catch(function (err) {
		console.log(err);
	});
};

setInterval(function () { refreshAccessToken(); }, 1800000);

function refreshAccessToken() {
	fetch('https://api.petfinder.com/v2/oauth2/token', {
		method: 'POST',
		body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}).then(function (response) {
		// Return the response as JSON
		return response.json();
	}).then(function (data) {
		// Log the API data
		console.log('token', data);
		// Store token data
		token = data.access_token;
		tokenType = data.token_type;
	}).catch(function (err) {
		console.log(err);
	});
}