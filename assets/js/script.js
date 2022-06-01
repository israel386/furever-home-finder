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