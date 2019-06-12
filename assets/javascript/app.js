$(document).ready(function() {

var x = document.getElementById("demo");
console.log("hello")

$('.modal').modal();
$('.modal').modal("open");

//Firebase Script Below

firebase.initializeApp(config)

const userName = $("#name").val().trim()
const userEmail = $("email").val().trim()
const userAge = $("age").val().trim()
const firebaseRef = firebase.database()

$('#loc-button').click(getLocation,
    // $(".allContent").css("display", "block"),
    // $("#map").css("display", "block")
    firebaseRef.ref().push({
        name: name,
        email: email,
        age: age,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
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
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

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
}

function addMarker(coords) {
    var marker = new google.maps.Marker({
        position: {lat: coords.latitude, lng: coords.longitude},
        map: map,
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
       
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
})