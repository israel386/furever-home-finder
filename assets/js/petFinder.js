document.addEventListener('DOMContentLoaded', function () {
	var key = 'dKli27YVN1Xw6LHvN9NAyhYR5dEydVxXXojInFquj2ZIyetfC6';
	var secret = 'x2rtjtX1uuWWLBsSomBt1QHVNtXtjTBnL5EoGWLr';
	var token, tokenType;

	var section = document.createElement('section');
    var div = document.createElement('div');
	var heading = document.createElement('h2');
	var para = document.createElement('p');
	var image = document.createElement('img');
	var apiUrl = document.createElement("a");
	var listEl = document.createElement("li");
	var btn = document.createElement("button")

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
		var params = "?limit=5"

		fetch(url + 'animals' + params, options)
			.then(function (response) {
				return response.json();
			}).then(function (data) {
				console.log(data);
				displayAvailable(data.animals);
			}).catch(function (error) {
				console.log(error);
			});
	};

	function displayAvailable(data) {
		data.forEach(function (animal) {
			console.log(animal);
			var name = animal.name;
			var animalsDiv = document.getElementById("animals");
			heading.innerText = name;
			// image.classList.add("");
			image.src = animal?.primary_photo_cropped.small;
			para.innerText = animal.description;
			// apiUrl.classList.add("");
			apiUrl.href = animal.url;
            animalsDiv.appendChild(div.cloneNode(true));
			animalsDiv.appendChild(heading.cloneNode(true));
			animalsDiv.appendChild(image.cloneNode(true));
			animalsDiv.appendChild(para.cloneNode(true));
			animalsDiv.appendChild(apiUrl.cloneNode(true));
		});
	};

    document.getElementById('searchButton').addEventListener('click', searchButton);

	function searchButton() {
        var url = 'https://api.petfinder.com/v2/';
		var options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: tokenType + ' ' + token
			},
		};
        var zip = document.getElementById('zip-code').value; // this line gets the zip code from the form entry
        var typeDogs = document.getElementById('dogsButton'); // this line gets the zip code from the form entry
        var typeCats = document.getElementById('catsButton'); // this line gets the zip code from the form entry
        
        if (typeDogs.checked) {
            fetch(url + 'animals?type=dog&location=' + zip, options)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                displayDogs(data.animals);
                saveZip();
            }).catch(function (error) {
                console.log(error);
            });
        } else if (typeCats.checked) {
            fetch(url + 'animals?type=cat&location=' + zip, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },

            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                displayCats(data.animals);
                saveZip();
            }).catch(function (error) {
                console.log(error);
            });
        }

        function saveZip(){
            var zipCode=document.getElementById("zip-code").value
            localStorage.setItem("zip code", zipCode)
            console.log(zipCode);
        }

        function displayDogs(data) {
            data.forEach(function (animal) {
                console.log(animal);
                var name = animal.name;
                var animalsDiv = document.getElementById("dogsSearch");
                heading.innerText = name;
                // image.classList.add("");
                image.src = animal?.primary_photo_cropped.small;
                para.innerText = animal.description;
                // apiUrl.classList.add("");
                apiUrl.href = animal.url;
                animalsDiv.appendChild(heading.cloneNode(true));
                animalsDiv.appendChild(image.cloneNode(true));
                animalsDiv.appendChild(para.cloneNode(true));
                animalsDiv.appendChild(apiUrl.cloneNode(true));
            });
        };

        function displayCats(data) {
            data.forEach(function (animal) {
                console.log(animal);
                var name = animal.name;
                var animalsDiv = document.getElementById("catsSearch");
                heading.innerText = name;
                // image.classList.add("");
                image.src = animal?.primary_photo_cropped.small;
                para.innerText = animal.description;
                // apiUrl.classList.add("");
                apiUrl.href = animal.url;
                animalsDiv.appendChild(heading.cloneNode(true));
                animalsDiv.appendChild(image.cloneNode(true));
                animalsDiv.appendChild(para.cloneNode(true));
                animalsDiv.appendChild(apiUrl.cloneNode(true));
            });
        };
    };

	getAccessToken();
});