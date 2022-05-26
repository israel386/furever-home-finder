var key = 'dKli27YVN1Xw6LHvN9NAyhYR5dEydVxXXojInFquj2ZIyetfC6'
var secret = 'x2rtjtX1uuWWLBsSomBt1QHVNtXtjTBnL5EoGWLr'
var token, tokenType;

function getAccessToken () {
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
    }).catch(function(err) {
        console.log(err);
    });
};

setInterval(function(){refreshAccessToken(); }, 1800000);

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
    }).catch(function(err) {
        console.log(err);
    });
}

// the next line and function set up the button in our html to be clickable and reactive 
document.addEventListener('DOMContentLoaded', bindButtons);

var availabledogsEl = document.querySelector('#available-dogs');
var availablecatsEl = document.querySelector('#available-cats');

function bindButtons() {
    document.getElementById('searchZip').addEventListener('click', function(event) {
        event.preventDefault();
        var zip = document.getElementById('zip-code').value; // this line gets the zip code from the form entry
        var url = 'https://api.petfinder.com/v2/animals';
            
        fetch(url, {
			method: "GET", 
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			},
			
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data);
			for (var i = 0; i <data.length; i++) {
                var availabledogsEl = data[i].name;
                var id = data[i].id;
			}
		}).catch(function(err) {
			console.log(err);
		})
    })
};

getAccessToken();