function createYoutubeWidget(videoId) {
    /*Get Data*/
    var first = '<h1><strong>' + videoId + '</strong></h1>'
    var iframe = '<iframe style="margin-bottom: 10px; border: 1px solid red; border-radius: 5px" width="100%" height="100%" src="https://www.youtube.com/embed/' + videoId + '"></iframe>'
    /*Create Widget*/
    this.grid = $('.grid-stack').data('gridstack')
    var node = {
        x: 3,
        y: 3,
        width: 5,
        height: 4,
    }
    var elementId = 'id="' + videoId + '"'
    var valueID = 'value="' + videoId + '"'
    var button = '<form action="/deleteWidget" method="POST"><input type="hidden" name="toRemove" ' + valueID + '></input><button type="submit" class="trashButton"></button></form>'
    var createElement = '<div class="grid-stack-item" ' + elementId + ' style="background-color: red; margin: 10px; border-radius: 10px;"><i style="position:absolute; top:3px; right: 4px" class="fab fa-youtube"></i><button id="editButton" class="editButton" onclick="editWidget(this.parentNode.id)"></button><div class="grid-stack-item-content" style="padding: 20px; text-align: center">' + button + first + iframe + '</div></div>'
    this.grid.addWidget($(createElement), node.x, node.y, node.width, node.height, node.name)
}
//Reload Video Views
function reloadYoutubeWidgetForView(videoId, reloadId) {
    var apiKey = 'AIzaSyDbB8TFiUCVdenG1rk8ObLdBQFkTIMwtBw'
    var url = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + videoId + "&key=" + apiKey
    fetch(url)
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        var statistics = data.items[0].statistics
        var toChange = document.getElementById(reloadId)
        toChange.innerHTML = '<i class="fas fa-eye"></i> ' + statistics.viewCount
    })
}
//Get Video Views
function createYoutubeWidgetForView(videoId) {
    var apiKey = 'AIzaSyDbB8TFiUCVdenG1rk8ObLdBQFkTIMwtBw'
    var url = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + videoId + "&key=" + apiKey
    fetch(url)
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        /*Get Data*/
        var elementId = 'id="' + videoId + '"'
        var reloadId = 'h2' + videoId + ''
        var statistics = data.items[0].statistics
        var first = '<h1><strong>' + videoId + '</strong></h1>'
        var second = '<h2 id="' + reloadId + '"><i class="fas fa-eye"></i> ' + statistics.viewCount + '</h2>'
        /*Create Widget*/
        this.grid = $('.grid-stack').data('gridstack')
        var node = {
            x: 3,
            y: 3,
            width: 4,
            height: 2,
        }
        var valueID = 'value="' + videoId + '"'
        var button = '<form action="/deleteWidget" method="POST"><input type="hidden" name="toRemove" ' + valueID + '></input><button type="submit" class="trashButton"></button></form>'
        var createElement = '<div class="grid-stack-item" ' + elementId + ' style="background-color: red; margin: 10px; border-radius: 10px;"><i style="position:absolute; top:3px; right: 4px" class="fab fa-youtube"></i><button id="editButton" class="editButton" onclick="editWidget(this.parentNode.id)"></button><div class="grid-stack-item-content" style="padding: 20px; text-align: center">' + button + first + second + '</div></div>'
        this.grid.addWidget($(createElement), node.x, node.y, node.width, node.height, node.name)
        //Reload Widget Instance
        reload = setInterval(function() { reloadYoutubeWidgetForView(videoId, reloadId) }, 10000)
    })
}
//Reload Video Likes & Dislikes
function reloadYoutubeWidgetForLikesDislikes(videoId, reloadIdOne, reloadIdTwo) {
    var apiKey = 'AIzaSyDbB8TFiUCVdenG1rk8ObLdBQFkTIMwtBw'
    var url = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + videoId + "&key=" + apiKey
    fetch(url)
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        /*Get Data*/
        var statistics = data.items[0].statistics
        var likes = statistics.likeCount
        var dislikes = statistics.dislikeCount
        var idOne = document.getElementById(reloadIdOne)
        var idTwo = document.getElementById(reloadIdTwo)
        idOne.innerHTML = '<i class="fas fa-thumbs-up"></i> ' + likes
        idTwo.innerHTML = '<i class="fas fa-thumbs-down"></i> ' + dislikes
    })
}
//Get Video Likes & Dislikes
function createYoutubeWidgetForLikesDislikes(videoId) {
    var apiKey = 'AIzaSyDbB8TFiUCVdenG1rk8ObLdBQFkTIMwtBw'
    var url = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + videoId + "&key=" + apiKey
    fetch(url)
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        /*Get Data*/
        var statistics = data.items[0].statistics
        var likes = statistics.likeCount
        var dislikes = statistics.dislikeCount
        var reloadIdOne = 'h2Likes' + videoId
        var reloadIdTwo = 'h2dislikes' + videoId
        //
        var first = '<h1><strong>' + videoId + '</strong></h1>'
        var second = '<h2 id="' + reloadIdOne + '"><i class="fas fa-thumbs-up"></i> ' + likes + '</h2>'
        var secondBis = '<h2 id="' + reloadIdTwo + '"><i class="fas fa-thumbs-down"></i> ' + dislikes + '</h2>'
        /*Create Widget*/
        this.grid = $('.grid-stack').data('gridstack')
        var node = {
            x: 3,
            y: 3,
            width: 4,
            height: 2,
        }
        var elementId = 'id="' + videoId + '"'
        var valueID = 'value="' + videoId + '"'
        var button = '<form action="/deleteWidget" method="POST"><input type="hidden" name="toRemove" ' + valueID + '></input><button type="submit" class="trashButton"></button></form>'
        var createElement = '<div class="grid-stack-item" ' + elementId + ' style="background-color: red; margin: 10px; border-radius: 10px;"><i style="position:absolute; top:3px; right: 4px" class="fab fa-youtube"></i><button id="editButton" class="editButton" onclick="editWidget(this.parentNode.id)"></button><div class="grid-stack-item-content" style="padding: 20px; text-align: center">' + button + first + second + secondBis + '</div></div>'
        this.grid.addWidget($(createElement), node.x, node.y, node.width, node.height, node.name)
        //Reload Widget Instance
        reload = setInterval(function() { reloadYoutubeWidgetForLikesDislikes(videoId, reloadIdOne, reloadIdTwo) }, 10000)
    })
}