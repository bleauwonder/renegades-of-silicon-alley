$(document).ready(function() {
    
//Modal open on page load
$('.modal').modal();
$('.modal').modal("open");

var firebaseConfig = {
    apiKey: "AIzaSyD89eHz6vpEhwS-7Yl5LWxAhkNEb_3jzj4",
    authDomain: "renegade-trailbrews.firebaseapp.com",
    databaseURL: "https://renegade-trailbrews.firebaseio.com",
    projectId: "renegade-trailbrews",
    storageBucket: "renegade-trailbrews.appspot.com",
    messagingSenderId: "714621014313",
    appId: "1:714621014313:web:8e285f45bbe8e0d8"
    };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$('#loc-button').click(function (event) {
    var userName = $("#userName").val().trim()
    var userEmail = $("#userEmail").val().trim()
    var userAge = $("input[name='age']:checked").val().trim()
    var firebaseRef = firebase.database()
    
        console.log(userName)
        console.log(userEmail)
        console.log(userAge)
        getLocation()
        event.preventDefault();
        firebaseRef.ref().push({
            name: userName,
            email: userEmail,
            age: userAge,
            dateAdded: firebase.database.ServerValue.TIMESTAMP})
    }
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
    });
    var infoWindow = new google.maps.InfoWindow({
        content: '<h1>TRAIL APIS</h1>'
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
var icons = {
    user: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            createMap(position);
        });
    }
    else {
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

    addMarker(userLocation, icons.user);
    // addMarker(coords, icons.name)
    callTrailApi();

    callBreweryAPI();
}

function addMarker(coords, icon) {
console.log(icon)
    var contentString = '<div id="content">'
        '<p>hello</p>' +
        '</div>' +
        '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var markerInfo = {
        position: { lat: coords.latitude, lng: coords.longitude },
        map: map,
        title: 'Uluru (Ayers Rock)',
    }

    if (icon !== undefined) {
        markerInfo.icon = icon
    }

    var marker = new google.maps.Marker(markerInfo);

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}

function handleTrails(response) {
    var results=response.trails;

    console.log(results)

    for (i = 0; i < 5; i++) {
    //Name of the trail
            var TrailName = results[i].name;
    //Location 
            var TrailLocation = results[i].location;
    //Rating
            var rating = results[i].stars;

            var newRow = $("<tr>").append(
                $("<td>").text(TrailName),
                $("<td>").text(TrailLocation),
                $("<td>").text(rating),
              );
              // Append the new row to the table
              $("#trail-table > tbody").append(newRow);

            addMarker({latitude: results[i].latitude, longitude:results[i].longitude});
    }
}

    function callTrailApi() {
        $.ajax({
            url: "https://www.hikingproject.com/data/get-trails?lat=" + userLocation.latitude + "&lon=" + userLocation.longitude + "&maxDistance=50&key=200484748-f8ca8efbf0bcd4f50d87851ee05fd10a",
            method: "GET"
        }).then(handleTrails)
    }

    function callBreweryAPI(){
        $.ajax({
            url: "https://api.openbrewerydb.org/breweries?by_state=new_york", 
            method: "GET" 
        }).then(handleBreweries)
    }

    function handleBreweries(response) {
        console.log(response)
        
         for(x=0 ; x<5 ; x++){

        var name = response[x].name;
        var street = response[x].street;
        var phone = response[x].phone;

        var nRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(street),
            $("<td>").text(phone),
          );
        
          $("#brewery-table > tbody").append(nRow);

        console.log(response);
        console.log(name);
        var coords = {
            latitude: response[0].latitude,
            longitude: response[0].longitude
        }
        }
        addMarker(coords);   
    }

    $(document).ready(function(){
        $('.carousel').carousel();
      });
          
});
