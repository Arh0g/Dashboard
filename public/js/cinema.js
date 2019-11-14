function createCinemaWidgetMovieInformation(movieName) {
    var apiKey = "8943a8d22d6a57cbd56344247b60640c"
    var url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + movieName
    fetch(url)
    .then(resp => resp.json())
    .then (data => {
        var movieInformation = data.results[0]
        var title = movieInformation.original_title
        var note = movieInformation.vote_average
        var img = '<img style="border: 1px solid transparent; border-radius: 5px" src="http://image.tmdb.org/t/p/w300/' + movieInformation.poster_path + '">'
        var first = '<h2>' + title + '</h2>'
        var second = '<h3 style="margin-top: 10px"><strong><i class="fas fa-star"></i> ' + note + '</strong></h3>'
        var secondBis = '<h3><strong><i class="fas fa-clock"></i> ' + movieInformation.release_date + '</strong></i></h3>'
        var secondBisBis = '<h3><strong><i class="fas fa-users"></i> ' + movieInformation.popularity + '</strong></i></h3>'
        /*Create Widget*/
        this.grid = $('.grid-stack').data('gridstack')
        var node = {
            x: 3,
            y: 3,
            width: 4,
            height: 7,
        }
        var elementId = 'id="' + movieName + '"'
        var valueID = 'value="' + movieName + '"'
        var button = '<form action="/deleteWidget" method="POST"><input type="hidden" name="toRemove" ' + valueID + '></input><button type="submit" class="trashButton"></button></form>'
        var createElement = '<div class="grid-stack-item" ' + elementId + ' style="background-color: #F5C518; margin: 10px; border-radius: 10px;"><i style="position:absolute; top:3px; right: 4px" class="fas fa-film"></i><button id="editButton" class="editButton" onclick="editWidget(this.parentNode.id)"></button><div class="grid-stack-item-content" style="padding: 20px; text-align: center">' + button + img + second + secondBis + secondBisBis + '</div></div>'
        this.grid.addWidget($(createElement), node.x, node.y, node.width, node.height)
    })
}