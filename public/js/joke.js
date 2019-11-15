function reloadJokeWidgetChuckNorris(jokeWord, reloadId) {
    var url = "https://api.chucknorris.io/jokes/search?query=" + jokeWord
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
        var dataReal = data.result
        var total = dataReal.length
        var randomIdJoke = getRandomInt(total)
        var joke = dataReal[randomIdJoke]
        var idOne = document.getElementById(reloadId)
        idOne.innerHTML = '<strong>' + joke.value + '</strong>'
    })
}

function createJokeWidgetChuckNorris(jokeWord) {
    var url = "https://api.chucknorris.io/jokes/search?query=" + jokeWord
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
        var dataReal = data.result
        var total = dataReal.length
        var randomIdJoke = getRandomInt(total)
        var joke = dataReal[randomIdJoke]
        var first = '<img src="' + joke.icon_url + '"></img>'
        var reloadId = 'h4' + jokeWord
        var second = '<h4 id="' + reloadId + '"style="color: black; margin-top: 10px"><strong>' + joke.value + '</strong></h4>'
        /*Create Widget*/
        this.grid = $('.grid-stack').data('gridstack')
        var node = {
            x: 3,
            y: 3,
            width: 5,
            height: 2,
        }
        var elementId = 'id="' + jokeWord + '"'
        var valueID = 'value="' + jokeWord + '"'
        var button = '<form action="/deleteWidget" method="POST"><input type="hidden" name="toRemove" ' + valueID + '></input><button type="submit" class="trashButton"></button></form>'
        var createElement = '<div class="grid-stack-item" ' + elementId + ' style="background-color: bisque; margin: 10px; border-radius: 10px;"><i style="position:absolute; top:3px; right: 4px" class="fas fa-hat-cowboy-side"></i><button id="editButton" class="editButton" onclick="editWidget(this.parentNode.id)"></button><div class="grid-stack-item-content" style="padding: 20px; text-align: center">' + button + first + second + '</div></div>'
        this.grid.addWidget($(createElement), node.x, node.y, node.width, node.height)
        //Reload Widget Instance
        reload = setInterval(function() { reloadJokeWidgetChuckNorris(jokeWord, reloadId) }, 30000)
    })
}