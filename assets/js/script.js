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
// the next line and function set up the button in our html to be clickable and reactive 
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
  searchButton.addEventListener('click', saveZip)
	document.getElementById('searchButton').addEventListener('click', function (event) {
		event.preventDefault();
		var zip = document.getElementById('zip-code').value; // this line gets the zip code from the form entry
		var apiurl = 'https://api.petfinder.com/v2/animals';

		fetch(apiurl, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			},

		}).then(function (response) {
			return response.json();
		}).then(function (data) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				var name = data[i].petfinder.pet.name.$t;
				var img = data[i].petfinder.pet.media.photos.photo[0].$t;
				var id = data[i].petfinder.pet.id.$t;

				var newName = document.createElement('a');
				var animalsList = document.getElementById('animals-list');
				newName.textContent = name;
				newName.href = 'https://www.petfinder.com/v2/animals' + id;

				var newImg = document.createElement('img');
				newImg.src = img;
				newImg.setAttribute('style', 'max-width: 200px')
				var animal = document.createElement("li");
				// list.setAttribute("id", "List");
				// document.body.appendChild(list);
				animalsList.appendChild(animal)
				animal.appendChild(newName)
				animal.appendChild(newImg);

			}
		})
	});
  function saveZip(){
    var zipCode=document.getElementById("zip-code").value
    localStorage.setItem("zip code", zipCode)
    console.log(zipCode);
  }

}

getAccessToken();
// function displayResults (){
//   var animalInfo=document.createElement("div");
//   var animalPic=document.createElement("img");
//   var age=document.createElement("p");
//   var breed=document.createElement("p");
//   var status=document.createElement("p")

//   animalInfo.classList.add(card)
//   document.animalResultsList.append(animalInfo);
//   document.animalInfo.appendChild(animalPic);
//   document.animalInfo.appendChild(name);
//   document.animalInfo.appendChild(age);
//   document.animalInfo.appendChild(breed);
//   document.animalInfo.appendChild(status)