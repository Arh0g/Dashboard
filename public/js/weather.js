function reloadWeatherWidget(cityWeather) {
    /*Get Data*/
    var key = '48eb9b6228b51e3445b97cb1640729a1'
    var city = cityWeather
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key)
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        var temp =  parseFloat(data.main.temp)-273.15
    })
}

function createWeatherWidget(cityWeather) {
    /*Get Data*/
    var key = '48eb9b6228b51e3445b97cb1640729a1'
    var city = cityWeather
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key)
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        var country = data.sys.country
        var temp =  Math.round(parseFloat(data.main.temp)-273.15);
        var desc = data.weather[0].description
        var first = '<h1>' + '<strong>' + city + ', ' + country + '</strong>' + '</h1>'
        var second = '<h2><i class="fas fa-thermometer-half"></i> ' + temp + ' °, ' + desc +'</h2>'
        /*Create Widget*/
        this.grid = $('.grid-stack').data('gridstack')
        var node = {
            x: 3,
            y: 3,
            width: 4,
            height: 2
        }
        var elementId = 'id="' + cityWeather + '"'
        var valueID = 'value="' + cityWeather + '"'
        var button = '<form action="/deleteWidget" method="POST"><input type="hidden" name="toRemove" ' + valueID + '></input><button class="trashButton" type="submit"></button></form>'
        var createElement = '<div onload="reloadWeatherWidget()" class="grid-stack-item" ' + elementId + ' style="background-color: powderblue; margin: 10px; border-radius: 10px;" ><i style="position: absolute; top: 3px; right: 4px" class="fas fa-cloud-sun"></i><button id="editButton" class="editButton" onclick="editWidget(this.parentNode.id)"></button><div class="grid-stack-item-content" style="padding: 20px; text-align: center">' + button + first + second + '</div></div>'
        this.grid.addWidget($(createElement), node.x, node.y, node.width, node.height)
        //Reload Widget Instance
        reload = setInterval(function() { reloadWeatherWidget(cityWeather) }, 2000)
        })
    .catch(function() {
        return false
    })
}