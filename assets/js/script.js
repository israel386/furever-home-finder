var apiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJkS2xpMjdZVk4xWHc2TEh2TjlOQXloWVI1ZEV5ZFZ4WFhvakluRnF1ajJaSXlldGZDNiIsImp0aSI6IjJmOTU4MzYwODZmZGIzMDNiMTU5OGFmOWEyN2MxMzA5MTY5YzhiOTlhOWU3MzgyYTIxOWVjZmEwZTU0OWI3NzhmNGM4MzQ4YmNhOTc4ZjNjIiwiaWF0IjoxNjUzNTIxMjgzLCJuYmYiOjE2NTM1MjEyODMsImV4cCI6MTY1MzUyNDg4Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.Rlzzl3VYSrrsm-YBZwUb1queWS65wHbQGzeXeoyov3ysZO6y6GfQ6uS72s0maB9m8EcoWAJLt9cbfr_Bb_A-kNGMF5-7jOP56WuNGBwwjSx_9PfW3MpPAO26k6RV3-oo5GojqRh3WWc6nUYpOw0x9OAI3fExVT6EBAT6og1UO3XRTGRKX06_Ke4HTLLhFL5eYU0H53O8Y_R8cyW5GtNLzkeizIEx3UJnLyloKJWHwykyDzp3qlAAd5RG1IsikGtdOZGEy_6yNYlU5oQpypWnnhZpsqmENB3u2rWL6q7XvhMJdPJ8wWWPvDjxdtc3Smu8Sa-1TNuB8ZvvWvEBOSzGlg'; // assign our key to a variable, easier to read

// the next line and function set up the button in our html to be clickable and reactive 
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
	document.getElementById('submitZip').addEventListener('click', function (event) {
		event.preventDefault();
		var zip = document.getElementById('zip').value; // this line gets the zip code from the form entry
		var url = 'https://api.petfinder.com/v2/animals';

		fetch(url, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + apiToken
			},

		}).then(function (response) {
			return response.json();
		}).then(function (data) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				var catName = data[i].petfinder.pet.name.$t;
				var img = data[i].petfinder.pet.media.photos.photo[0].$t;
				var id = data[i].petfinder.pet.id.$t;

				var newName = document.createElement('a');
				var newDiv = document.getElementById('animals-list');
				newName.textContent = catName;
				newName.href = 'https://www.petfinder.com/v2/animals' + id;

				var newImg = document.createElement('img');
				newImg.src = img;

				var list = document.createElement("ul");
				list.setAttribute("id", "List");
				document.body.appendChild(list);

				newDiv.appendChild(newName);
				list.appendChild(newDiv);
				list.appendChild(newImg);
			}
		}).catch(function (err) {
			console.log(err);
		})
	})

}