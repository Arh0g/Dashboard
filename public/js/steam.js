function createSteamWidgetUserInformation(playerId) {
    //76561198411894760
    var apiKey = "F1E6CC6FAACA332C636766584B04B57F"
    var url = "https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + apiKey + "&steamids=" + playerId
    fetch(url)
    .then(resp => resp.json())
    .then (data => {
        var playerInformations = data.response.players[0]
        var first = '<img style="border: 1px solid black; border-radius: 80px" src="' + playerInformations.avatarfull + '">'
        var second = '<h2 style="color: white; margin-top: 10px"><strong>' + playerInformations.personaname + '</strong></h2>'
        var third = '<a target="_blank" style="color: white" href="' + playerInformations.profileurl + '">See Profile</a>'
        /*Create Widget*/
        this.grid = $('.grid-stack').data('gridstack')
        var node = {
            x: 3,
            y: 3,
            width: 4,
            height: 4,
        }
        var elementId = 'id="' + playerId + '"'
        var valueID = 'value="' + playerId + '"'
        var button = '<form action="/deleteWidget" method="POST"><input type="hidden" name="toRemove" ' + valueID + '></input><button type="submit" class="trashButton"></button></form>'
        var createElement = '<div class="grid-stack-item" ' + elementId + ' style="background-color: black; margin: 10px; border-radius: 10px;"><i style="position:absolute; top:3px; right: 4px" class="fab fa-steam"></i><button id="editButton" class="editButton" onclick="editWidget(this.parentNode.id)"></button><div class="grid-stack-item-content" style="padding: 20px; text-align: center">' + button + first + second + third + '</div></div>'
        this.grid.addWidget($(createElement), node.x, node.y, node.width, node.height)
    })
}