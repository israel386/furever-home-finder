document.addEventListener('DOMContentLoaded', function () {
	var key = 'dKli27YVN1Xw6LHvN9NAyhYR5dEydVxXXojInFquj2ZIyetfC6';
	var secret = 'x2rtjtX1uuWWLBsSomBt1QHVNtXtjTBnL5EoGWLr';
	var token, tokenType;

	var section = document.createElement('section');
	var heading = document.createElement('h2');
	var para = document.createElement('p');
	var image = document.createElement('img');
	var apiUrl = document.createElement("a");

	// Executes GET request 
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
			petFinder();
		}).catch(function (err) {
			console.log(err);
		});
	};

	setInterval(function () { refreshAccessToken(); }, 1799999);

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
	};

	// Sets up the button in our html to be clickable and reactive 
	function petFinder() {
		var url = 'https://api.petfinder.com/v2/';
		var options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: tokenType + ' ' + token
			},
		};

		fetch(url + 'animals', options)
			.then(function (response) {
				return response.json();
			}).then(function (data) {
				console.log(data);
				displayAvailable(data);
			}).catch(function (error) {
				console.log(error);
			});

		function displayAvailable(data) {
			for (var i = 0; i < 20; i++) {
				var animals = data.animals[i];
				var animalsDiv = document.getElementById("animals1");
				var animalsName = animals.name;

				animalsDiv.innerHTML = animalsName;
				animalsDiv.appendChild(heading);
				image.src = animals[i].primary_photo_cropped.small;
				// image.alt = dog.;
				animalsDiv.appendChild(image);
				// document.body.style.backgroundImage = "url('" + dog.primary_photo_cropped + "')";
				apiUrl.src = animals[i].url;
				animalsDiv.appendChild(apiUrl);
			};
		};
	};

	// document.getElementById('searchButton').addEventListener('click', function(event) {
	//     event.preventDefault();
	//     var zip = document.getElementById('zip-code').value; // this line gets the zip code from the form entry
	//     var typeDog = document.getElementById('dogsButton').value; // this line gets the zip code from the form entry
	//     var typeCat = document.getElementById('catsButton').value; // this line gets the zip code from the form entry
	//     // var typeRabbit = document.getElementById('rabbitsButton').value; // this line gets the zip code from the form entry

	//     fetch(url + 'animals', {
	// 		method: 'GET', 
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Authorization: 'Bearer ' + token
	// 		},

	// 	}).then(function (response) {
	// 		return response.json();
	// 	}).then(function (data) {
	// 		console.log(data);
	//         displayDogs(data);
	//         displayCats(data);
	// 	}).catch(function (error) { 
	// 		console.log(error);
	// 	});

	//     function displayDogs(data) {
	//         // for (var i = 0; i < data.length; i++) {
	//             const dog = data.animals[0];
	//             const dogDiv = document.getElementById("dog");
	//             const dogName = dog.name;
	//             const heading = document.createElement("h1");
	//             heading.innerHTML = dogName;
	//             dogDiv.appendChild(heading);
	//             const dogImg = document.createElement("img");
	//             dogImg.src = dog.primary_photo_cropped.small;
	//             dogDiv.appendChild(dogImg);
	//             document.body.style.backgroundImage = "url('" + dog.primary_photo_cropped + "')";
	//             const dogUrl = document.createElement("a");
	//             dogUrl.src = dog.url;
	//             dogDiv.appendChild(dogUrl);
	//         // };
	//     };

	//     function displayCats(data) {
	//         // for (var i = 0; i < data.length; i++) {
	//             const cat = data.animals[1];
	//             const catDiv = document.getElementById("cat");
	//             const catName = cat.name;
	//             const heading = document.createElement("h1");
	//             heading.innerHTML = catName;
	//             catDiv.appendChild(heading);
	//             const catImg = document.createElement("img");
	//             catImg.src = cat.primary_photo_cropped.small;
	//             catDiv.appendChild(catImg);
	//             document.body.style.backgroundImage = "url('" + cat.primary_photo_cropped + "')";
	//             const catUrl = document.createElement("a");
	//             catUrl.src = cat.url;
	//             catDiv.appendChild(catUrl);
	//         // };
	//     };
	// });

	getAccessToken();
	// availableAnimals();
});