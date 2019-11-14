//Load All Widgets
function loadAllWidgets() {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "/loadWidget", true)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var widgets = JSON.parse(xhr.responseText)
            for (var i = 0; i < widgets.length; i++) {
                //Youtube Widget Creation
                if (widgets[i].widgetName == "youtube") {
                    if (widgets[i].widgetRole == "loadVideo") {
                        createYoutubeWidget(widgets[i].widgetContent)
                    } else if (widgets[i].widgetRole == "getVideoViews") {
                        createYoutubeWidgetForView(widgets[i].widgetContent)
                    } else if (widgets[i].widgetRole == "getVideoLikesDislikes") {
                        createYoutubeWidgetForLikesDislikes(widgets[i].widgetContent)
                    }
                //Weather Widget Creation
                } else if (widgets[i].widgetName == "weather") {
                    if (widgets[i].widgetRole == "getWeatherByCity") {
                        createWeatherWidget(widgets[i].widgetContent)
                    }
                } else if (widgets[i].widgetName == "steam") {
                    if (widgets[i].widgetRole == "getPlayerInformation") {
                        createSteamWidgetUserInformation(widgets[i].widgetContent)
                    }
                } else if (widgets[i].widgetName == "cinema") {
                    if (widgets[i].widgetRole == "getMovieInformation") {
                        createCinemaWidgetMovieInformation(widgets[i].widgetContent)
                    }
                } else if (widgets[i].widgetName == "adultContent") {
                    if (widgets[i].widgetRole == "getRandomMovie") {
                        createAdultWidgetRandomMovie(widgets[i].widgetContent)
                    }
                }
            }
        }
    }
    xhr.send()
}