 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyC1PojpHjoTN9wfR-eKil9jcxbGvZeJ-6I",
     authDomain: "project-move-1523543773098.firebaseapp.com",
     databaseURL: "https://project-move-1523543773098.firebaseio.com",
     projectId: "project-move-1523543773098",
     storageBucket: "",
     messagingSenderId: "101064034892"
 };

 firebase.initializeApp(config);

 var database = firebase.database();

 var citiesArray =[];

// When the user clicks the search button
$("#user").on("click", function() {
    entireJavascript();
});

$("#usercity").keyup(function(event) {
    if (event.keyCode === 13) {
        entireJavascript();
    }
});

// All of the code!!!!! Lol  
function entireJavascript(){

    // Pull the value from the search form
    var userCity = $("#usercity").val().trim();

        userCity = userCity.toLowerCase();
        console.log("userCity: " + userCity);
  
        // input validation!
        if (userCity.length < 3) {
            $(".helper-text").text("Please enter a city name.")
        }

        else {

            // Starting the API info for the Weather API
        
            // query parameter
            var openWeatherparam = "&q="+userCity

            // putting it all together in a queryURL
            var queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?" + openWeatherparam + "&APPID=9155ad4470b3c881f026f9305727169c";
             
            // AJAX call for Open Weather API
            $.ajax({
                url: queryURL2,
                method: "GET",

                // If we receive an error message...
                error: function(response, error) {
                    console.log(error);
                    $(".helper-text").text("Please enter a valid city.");
                },

                // Once data is retrieved from API...
                success: function(response) {
                    console.log(response);

                    citiesArray.push(
                        userCity
                    ),
                        console.log(citiesArray);

                    database.ref().push({
                        City: userCity,
                    });

                    // hide the current content in search-content
                    $(".search-content").css('display', 'none');

                    // This is the back button so they can search again
                    var backbutton = $( "<li>");
                    var backbuttonLink = $("<a href='index.html'>Back to Search</a>")
                    backbutton.append(backbuttonLink);
                    $("#nav-mobile").append(backbutton);
                
                    // Pull the current weather and store in a variable
                    var nowWeather = response.list["0"].weather["0"].main;
                        console.log(nowWeather);

                    // Pull the description of the current weather and store in a variable
                    var nowWeatherDescription = response.list["0"].weather["0"].description;

                    // Pull the humidity value and store in a variable
                    var humidity = response.list["0"].main.humidity;

                    // Pull and round the current temperature converted to F, store in a variable
                    var temperature = Math.round((response.list["0"].main.temp - 273.15) * 1.8 + 32);

                    // pull the location's latitude
                    var lat = response.city.coord.lat;

                    // Pull the location's longitude
                    var long = response.city.coord.lon;
                    
                    // Setting up the dynamically-generated divs for the page!

                    var container = $("<div class='container' id='dynamic-container'>");

                    $("main").append(container);

                        // rows to house content
                        var weatherRow = $("<div class='row'>");

                        var promptRow = $("<div class='row'>");

                        var buttonRow = $("<div class='row'>");

                        var buttonRow2 = $("<div class='row' style='margin-bottom: 40px'>")

                        var mapRow = $("<div class='row' style='margin-bottom: 60px'>");

                        // append all rows to the container
                        container.append(weatherRow).append(promptRow).append(buttonRow).append(buttonRow2).append(mapRow);


                        // WEATHER SECTION
                
                        // column for Weather
                        var weatherCol2 = $("<div class='col m12' style='margin-top: 60px'>");

                        // append!
                        weatherRow.append(weatherCol2);

                            // Make the div that will show the current weather, this is the card container 
                            var newWeatherDiv = $("<div class='card' id='weatherCard'>");
                            
                            // append!
                            weatherCol2.append(newWeatherDiv);

                            // To add the background image to the weather div based on the weather:
                            if (nowWeather == "Clouds") {
                                var weatherConditionImage = "assets/images/clouds.jpg";
                                newWeatherDiv.css("background-image", "url('" + weatherConditionImage + "')");
                            }

                            else if (nowWeather == "Rain") {
                                var weatherConditionImage = "assets/images/rain_large.jpg";
                                newWeatherDiv.css("background-image", "url('" + weatherConditionImage + "')");
                            }

                            else {
                                var weatherConditionImage = "assets/images/sun.jpg";
                                newWeatherDiv.css("background-image", "url('" + weatherConditionImage + "')");
                            }

                            // Make a div that identifies as card stacked
                            var newWeatherCard = $("<div class='card-stacked'>");

                            // Append the card stacked div to the card horizontal div
                            newWeatherDiv.append(newWeatherCard);

                                // make a div that identifies the card content
                                var newWeatherContent = $("<div class='card-content'>");

                                // Append the card content div to the card horizontal div
                                newWeatherCard.append(newWeatherContent);

                                    // Adding in the text for the card
                                    newWeatherContent.append("<p style='font-size: 20px' class='center-align'>Weather conditions for " + response.city.name + "</p><br>")

                                    // Append a P tag that will hold the weather info
                                    newWeatherContent.append("<p class='center-align'>Next 3 hours:<br>" + nowWeatherDescription + " | " + humidity + "% humidity | " + temperature + " &#176 F</p><br>")

                                    // Append a suggestion
                                    if (nowWeather == "Clouds") {
                                        newWeatherContent.append("<p class='center-align'>Today would be a great day for hiking or biking!</p>");
                                    }

                                    else if (nowWeather == "Rain") {
                                        newWeatherContent.append("<p class='center-align'>It might be a good idea to stay home or go to the gym.</p>");
                                    }

                                    else {
                                        newWeatherContent.append("<p class='center-align'>It's a beautiful day to visit a park or go camping!</p>");
                                    }


                        // This section goes in the row for the prompt

                        // Column for the prompt
                        var promptCol =$("<div class='col m10 offset-m1 center-align'>");

                        // Append to the appropriate row
                        promptRow.append(promptCol);
                            
                            // Create a card
                            var promptCard =$("<div class='card'>");
                            
                            // Append it to the column
                            promptCol.append(promptCard);
                            
                                // Create the card content 
                                var promptCon = $("<div class='card-content'>");

                                // Append it to the card
                                promptCard.append(promptCon);
                                    
                                // Add text inside
                                promptCon.append("<h5> What would you like to do? </h5>");


                        // This section goes in the row for the buttons

                        // Create four columns, one for each button
                        var buttonCol0 = $("<div class='activity-btns btn-hiking-camping col m5 offset-m1 center-align'>");

                        var buttonCol1 = $("<div class='activity-btns col m5 center-align'>");

                        var buttonCol2 = $("<div class='activity-btns btn-hiking-camping col m5 offset-m1 center-align'>");

                        var buttonCol3 = $("<div class='activity-btns col m5 center-align'>");
                        
                        // Append the buttons to the appropriate rows
                        buttonRow.append(buttonCol0).append(buttonCol1);
                        buttonRow2.append(buttonCol2).append(buttonCol3);


                        // Add the buttons themselves & add the correct labels
                        buttonCol0.append("<button class='waves-effect waves-light btn-large card-color activity-btn' value='hiking' style='width: 100%'>Hiking</button>");

                        buttonCol1.append("<button class='waves-effect waves-light btn-large card-color activity-btn' value='mountain+biking' style='width: 100%'>Mountain Biking</button>");
                        
                        buttonCol2.append("<button class='waves-effect waves-light btn-large card-color activity-btn' value='camping' style='width: 100%'>Camping</button>");

                        buttonCol3.append("<button class='waves-effect waves-light btn-large card-color activity-btn' value='4' style='width: 100%'>Visit a Park</button>");

                        $(".activity-btn").on("click", function(){

                            contentCon.empty();

                            var active = $(this).attr("value");
                            console.log(active);
                            
                            var trailApi = "https://cors-anywhere.herokuapp.com/https://trailapi-trailapi.p.mashape.com/";

                            var trailParameters = "?limit=10&q[activities_activity_type_name_eq]="+active+"&q[city_cont]="+userCity+"&radius=25";
                    
                            queryURL1 = trailApi + trailParameters;
                    
                    
                            $.ajax({
                                url: queryURL1,
                                method: "GET",
                                headers: {
                                    "X-Mashape-Key":"UAIZZbiYBYmshS9WHNnVPYPKLg0Mp199qK4jsn409p32gnYRrE",
                                    "Accept": "text/plain"
                                }
                                }).then(function(response3) {
                                console.log(response3);
                    
                                var cityName = response3.places[1].city;
                                var siteName = response3.places[1].name;
                                var lat = response3.places[1].lat;
                                var long = response3.places[1].lon;

                                for (var i = 0; i < response3.places.length; i++ ){
                                        var trailbutton = "<button class='waves-effect waves-light btn-large card-color trail-btn'  value=" +[i]+ " style='width: 100%'>" + response3.places[i].name + "</button>";
                                        $(contentCon).append(trailbutton);
                                        console.log(i)

                                };
                                    
                            $(".trail-btn").on("click", function(){
                                var index = $(this).attr("value");
                                console.log("hi");
                                var infoArea = $("<div class='card'>");
                                var table = $("<table>");
                                var tr1 = $("<tr>");
                                var tableHead = $("<th id='activity-name'>");
                                var tr2 = $("<tr>");
                                var tableBody = $("<td id='activity-descr'>");
                                tableHead.text(response3.places[index].name);

                                if (response3.places[index].activities["0"].description == null) {
                                    tableBody.html("<em> Sorry, this location does not have a description. </em>")
                                }

                                else {
                                    tableBody.html(response3.places[index].activities["0"].description  + "<br> <br>" + "<a target='_blank' href='" + response3.places[index].activities["0"].url + "'>" + "Click here to learn more. </a>");
                                }

                               

                                table.append(tr1);
                                table.append(tr2);
                                tr1.append(tableHead);
                                tr2.append(tableBody);
                                infoArea.append(table);
                                (mapCol).append(infoArea);
                            })
                        console.log(cityName);
                        console.log(siteName);
                        console.log(lat);
                        console.log(long);
                        
                        // id 2 is hiking
                        // id 5 is mountain biking 
                        // id 6 is camping
                        // id 7 is caving
                      
                            });
                        })

                


                        // This section goes in the the map row
                        

                        // Create a column to house the map
                        var mapCol = $("<div class='col m7' id='map'>");

                            // append it to the row
                            mapRow.append(mapCol);

                            // Identify the API key for the map
                            var gmapAPIkey = "AIzaSyCSpUf0-RBtpwK-L4G2jhvJC9OqABx9aaY";
                
                            // Append the map to the map column
                            $(mapCol).append("<iframe width='100%' height='350' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?key=" + gmapAPIkey + "&q=" + userCity + "' allowfullscreen></iframe>");
                            
                            // Initialize the map
                            function initMap() {

                                // create a more simple variable for this area using the lat and long we pulled above
                                var myLatLng = {lat, long};

                                // Uh...
                                var map = new google.maps.Map(document.getElementById('map'), {
                                zoom: 4,
                                center: myLatLng
                                });

                                // ?????
                                var marker = new google.maps.Marker({
                                position: myLatLng,
                                map: map,
                                title: 'Hello World!'
                                });
                            }



                        // create a column to house the dynamic content
                        var contentCol = $("<div class='col m5'>");
                        
                            // append to the appropriate row
                            mapRow.append(contentCol);

                        // create the card 
                        var contentCard =$("<div class='card'>");

                            // append the card to the column
                            contentCol.append(contentCard);


                        // create the card content
                        var contentCon =$("<div class='card-content'>");

                            // append the content to the card
                            contentCard.append(contentCon);
            }
        });
    };
};




      // testing google places API

    //   var lat = response.city.coord.lat;

    //   var long = response.city.coord.lon;

    //   var queryURL3 = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=park&key=AIzaSyDHo3GT-iOjN9IDB6VbfxLPxHzuQRonFBU&location=" + lat + "," + long + "&radius=40000";


    //   console.log(lat + ", " + long);
    //   console.log(queryURL3);

    //   // AJAX call for Google Places API
    //   $.ajax({
    //   url: queryURL3,
    //   method: "GET"


    //   // Once data is retrieved from API...
    //   }).then(function(response2){
    //       console.log(response2);
    //   });



