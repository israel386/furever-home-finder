var ex = document.getElementById("cat-fact")

fetch(
    // TODO: Add query parameters to the URL such that the number of issues returned is limited to 10.
    // TODO: Add a `sort` parameter to sort the issues by `createdAt` in descending order.
    // Hint: use & to join multiple query parameters. Use `=` to join key and value.
    'https://cat-fact.herokuapp.com/facts'
)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var catFact = data[i].text

            var tr = document.createElement("p")

            tr.textContent = data[i].text

            ex.append(tr);


        }
    });