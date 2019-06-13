$(document).ready(function() {

var x = document.getElementById("demo");
console.log("hello")

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
var icons = {
    user: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // brewery: 'data:image/jpeg;base64,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',
    // trail: ''
}

function getLocation() {
    if (navigator.geolocation) {
        // navigator.geolocation.getCurrentPosition((position) => createMap(position));
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
   //------//
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
    //---------------------------------------------------------
// // Name of the trail

            // var NameDiv = $("<div>");
            var TrailName = results[i].name;
            // var p = $("<td>").text(TrailName);
            // NameDiv.append(p);
            // $("#nameDisplay").append(NameDiv);
// //---------------------------------------------------------
// // Adding location 

            // var LocationDiv = $("<div>");
            var TrailLocation = results[i].location;
            // var p = $("<td>").text(TrailLocation);
            // LocationDiv.append(p);
            // $("#LocationDisplay").append(LocationDiv);
// //---------------------------------------------------------
// // Adding Rating
            // var TrailDiv = $("<div>");
            var rating = results[i].stars;
            // var p = $("<td>").text(rating);
            // TrailDiv.append(p);
            // $("#RatingDisplay").append(TrailDiv);
// //---------------------------------------------------------
// // Adding Difficulty Display
            // var DifficultyDiv = $("<div>");
            // var TrailDifficulty= results[i].difficulty;
            // var p = $("<td>").text(TrailDifficulty);
            // DifficultyDiv.append(p);
            // $("#DifficultyDisplay").append(DifficultyDiv);
// //---------------------------------------------------------
// // Adding Difficulty Display
            // var ConditionDiv = $("<div>");
            // var details = results[i].conditionDetails;
            // var p = $("<td>").text(details);
            // ConditionDiv.append(p);
            // $("#ConditionDisplay").append(ConditionDiv);

            var newRow = $("<tr>").append(
                $("<td>").text(TrailName),
                $("<td>").text(TrailLocation),
                $("<td>").text(rating),
                // $("<td>").text(TrailDifficulty),
                // $("<td>").text(details),
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

//-----------------------------------------------------------------------------------------

    function callBreweryAPI(){
        $.ajax({
            url: "https://api.openbrewerydb.org/breweries?by_state=new_york", 
            method: "GET" 
        }).then(handleBreweries)
    }

    function handleBreweries(response) {
        console.log(response)
        
        
         for(x=0 ; x<5 ; x++){

        
        // var breweryName = $("<div>");
        var name = response[x].name;
        // var text = $("<td>").text(name);
        // breweryName.append(text);
        // $('#breweryName').append(breweryName);

        // var breweryStreet = $("<div>");
        var street = response[x].street;
        // var text = $("<td>").text(street);
        // breweryStreet.append(text);
        // $('#breweryAddress').append(breweryStreet);

        // var breweryPhone = $("<div>");
        var phone = response[x].phone;
        // var text = $("<td>").text(phone);
        // breweryPhone.append(text);
        // $('#breweryPhone').append(breweryPhone);

        var nRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(street),
            $("<td>").text(phone),
          );
        
          // Append the new row to the table
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
