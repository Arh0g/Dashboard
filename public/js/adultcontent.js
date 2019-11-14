function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function createAdultWidgetRandomMovie(movieName) {
    var url = 'https://cors-anywhere.herokuapp.com/https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=' + movieName + '&thumbsize=medium'
    fetch(url)
    .then(resp => resp.json())
    .then (data => {
        /*Get Data*/
        var total = data.videos.length
        var randomIdMovie = getRandomInt(total)
        var movie = data.videos[randomIdMovie]
        var movieUrl = movie.video.embed_url
        var first = '<h1><strong>' + movie.video.title + '</strong></h1>'
        var video = '<iframe style="border: 1px solid pink; border-radius: 5px;" src="' + movieUrl + '"></iframe>'
        /*Create Widget*/
        this.grid = $('.grid-stack').data('gridstack')
        var node = {
            x: 3,
            y: 3,
            width: 4,
            height: 3,
        }
        var elementId = 'id="' + movieName + '"'
        var valueID = 'value="' + movieName + '"'
        var button = '<form action="/deleteWidget" method="POST"><input type="hidden" name="toRemove" ' + valueID + '></input><button type="submit" class="trashButton"></button></form>'
        var createElement = '<div class="grid-stack-item" ' + elementId + ' style="background-color: pink; margin: 10px; border-radius: 10px;"><i style="position:absolute; top:3px; right: 4px" class="fas fa-dog"></i><button id="editButton" class="editButton" onclick="editWidget(this.parentNode.id)"></button><div class="grid-stack-item-content" style="padding: 20px; text-align: center">' + button + first + video + '</div></div>'
        this.grid.addWidget($(createElement), node.x, node.y, node.width, node.height)
    })
}