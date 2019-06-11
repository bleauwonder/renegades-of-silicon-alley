$(document).ready(function() {

var x = document.getElementById("demo");
console.log("hello")

$('.modal').modal();
$('.modal').modal("open");

$('#loc-button').click(getLocation,
    // $(".allContent").css("display", "block"),
    // $("#map").css("display", "block")
);



function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    Latitud = position.coords.latitude;
    Longitud = position.coords.longitude;

            var options = {
        zoom: 8,
        //     center: { lat: 40.730610, lng: -73.935242}
        center: { lat: Latitud, lng: Longitud }
    }
    // new map
    var map = new google.maps.Map(document.getElementById('map'), options);
    var marker = new google.maps.Marker({
        position: { lat: Latitud, lng: Longitud },
        map: map,
        // icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

    });
    var infoWindow = new google.maps.InfoWindow({
        content: '<h1>HERE WE DISPLAY THE INFORMATION FROM THE TRAIL APIS</h1>'
    });

    marker.addListener('click', function () {
        infoWindow.open(map, marker);

    });

}

var x = document.getElementById("demo");
var userLocation;
var map;
var trails = [];
var myLocation;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(createMap);

    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function createMap(position) {
    // assign global var with value
    userLocation = position.coords

    var options = {
        zoom: 10,
        center: { lat: userLocation.latitude, lng: userLocation.longitude }
    }
    map = new google.maps.Map(document.getElementById('map'), options);
    var infoWindow = new google.maps.InfoWindow({
        content: '<P>What an amazing location! Are you ready for some fun?</P>'
    });

    addMarker(userLocation)
    callTrailApi();
   //------//
    callBreweryAPI();

}

function addMarker(coords) {


    var contentString = '<div id="content">'
        '<p>hello</p>' +
        '</div>' +
        '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

  var marker = new google.maps.Marker({
        position: {lat: coords.latitude, lng: coords.longitude},
        map: map,
        title: 'Uluru (Ayers Rock)',
        // icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
       
    });

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}

function handleTrails(response) {
    var results=response.trails;

    console.log(results)

    for (i = 0; i < results.length; i++) {
    //---------------------------------------------------------
// // Name of the trail

            var NameDiv = $("#nameDisplay");
            var TrailName = results[i].name;
            var p = $("<p>").text(TrailName);
            NameDiv.append(p);
// //---------------------------------------------------------
// // Adding location 

            var LocationDiv = $("#LocationDisplay");
            var TrailLocation = results[i].location;
            var p = $("<p>").text(TrailLocation);
            LocationDiv.append(p);
// //---------------------------------------------------------
// // Adding Rating
            var TrailDiv = $("#RatingDisplay");
            var rating = results[i].stars;
            var p = $("<p>").text(rating);
            TrailDiv.append(p);
// //---------------------------------------------------------
// // Adding Difficulty Display
            var DifficultyDiv = $("#DifficultyDisplay");
            var TrailDifficulty= results[i].difficulty;
            var p = $("<p>").text("rating" + TrailDifficulty);
            DifficultyDiv.append(p);
// //---------------------------------------------------------
// // Adding Difficulty Display
            var ConditionDiv = $("#ConditionDisplay");
            var details = results[i].conditionDetails;
            var p = $("<p>").text("rating" + details);
            ConditionDiv.append(p);

            addMarker({latitude: results[i].latitude, longitude:results[i].longitude});

    }
}

    function callTrailApi() {
        $.ajax({
            url: "https://www.hikingproject.com/data/get-trails?lat=" + userLocation.latitude + "&lon=" + userLocation.longitude + "&maxDistance=50&key=200484748-f8ca8efbf0bcd4f50d87851ee05fd10a",
            method: "GET"
        }).then(handleTrails)
    }

//-----------------------------------------------------------------------------------------

    function callBreweryAPI(){
        $.ajax({
            url: "https://api.openbrewerydb.org/breweries?by_state=new_york", 
            method: "GET" 
        }).then(handleBreweries)
        

    }



    function handleBreweries(response) {
        console.log(response)
        for(x=0 ; response.length ; x++){
        
        var breweryName = $("<div>");
        var name = response[x].name;
        var text = $("<p>").text(name);
        breweryName.append(text);
        $('#breweryName').append(breweryName);

        var breweryStreet = $("<div>");
        var street = response[x].street;
        var text = $("<p>").text(street);
        breweryStreet.append(text);
        $('#breweryAddress').append(breweryStreet);

        var breweryPhone = $("<div>");
        var phone = response[x].phone;
        var text = $("<p>").text(phone);
        breweryPhone.append(text);
        $('#breweryPhone').append(breweryPhone);


        console.log(response);
        console.log(name);
        var coords = {
            latitude: response[0].latitude,
            longitude: response[0].longitude
        }
        }
        addMarker(coords);   
    }


})
