$(document).ready(function(){
  initialize();
  map.set('styles', mapStyle);
  calcRoute();
});

// GETTING LOCATION FROM BROWSER

var geo_lat = null;
var geo_lng = null;

var pointA = new google.maps.LatLng(-1.2921, 36.8219); // INPUT DEPARTURE POINT HERE
var pointB = new google.maps.LatLng(-4.0435, 39.6682); // INPUT DESTINATION POINT HERE
var olla;
var historicalOverlay;


var watchID;
         var geoLoc;
         
         function showLocation(position) {
            var geo_lat = position.coords.latitude;
            var geo_lng = position.coords.longitude;
            olla = new google.maps.LatLng(geo_lat, geo_lng);
            overlay = new CustomMarker(olla, map);
            console.log(geo_lat, geo_lng);
            map.panTo(olla);
         }
         
         function errorHandler(err) {
            if(err.code == 1) {
               alert("Error: Access is denied!");
            }
            
            else if( err.code == 2) {
               alert("Error: Position is unavailable!");
            }
         }
         
         function getLocationUpdate(){
            if(navigator.geolocation){
               // timeout at 60000 milliseconds (60 seconds)
               var options = {timeout:60000};
               geoLoc = navigator.geolocation;
               watchID = geoLoc.watchPosition(showLocation, errorHandler, options);
            }
            
            else{
               alert("Sorry, browser does not support geolocation!");
            }
         }
  

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {

  var geocoder = new google.maps.Geocoder;
  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

  var overlay = new CustomMarker(pointA, map);

  var mapOptions = {
    zoom:15,
    mapTypeControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    streetViewControl: false
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsDisplay.setMap(map);

  overlay2 = new CustomPoint(pointA, map, "A", "start");
  overlay3 = new CustomPoint(pointB, map, "B", "end"); 

  getLocationUpdate();
  map.setZoom(16);
}

function calcRoute() {
  var start = "Nairobi, Kenya"
  var end = "Mombasa, Kenya"
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}

CustomMarker.prototype = new google.maps.OverlayView();
CustomMarker.prototype.draw = function() {
 var me = this;
     // Check if the div has been created.
     var div = this.div_;
     if (!div) {
       // Create a overlay text DIV
       div = this.div_ = document.createElement('DIV');
       // Create the DIV representing our CustomMarker
       div.style.background =  '#374FFF';
       div.style.position = 'absolute';
       div.style.paddingLeft = '0px';
       div.style.cursor = 'pointer';
       div.style.width = '20px';
       div.style.height = '20px';
       div.style.marginLeft = '-10px';
       div.style.marginTop = '-10px';
       div.style.borderRadius = '50%';
       // div.style.boxShadow = '10px 10px 20px 0px rgba(0,0,0,0.75)';
       div.className = "heartbat";

       google.maps.event.addDomListener(div, "click", function(event) {
         google.maps.event.trigger(me, "click");
       });

       // Then add the overlay to the DOM
       var panes = this.getPanes();
       panes.overlayImage.appendChild(div);
     }

     // Position the overlay 
     var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
     if (point) {
       div.style.left = point.x + 'px';
       div.style.top = point.y + 'px';
     }
   };

   CustomMarker.prototype.remove = function() {
     // Check if the overlay was on the map and needs to be removed.
     if (this.div_) {
       this.div_.parentNode.removeChild(this.div_);
       this.div_ = null;
     }
   };


   CustomMarker.prototype.getPosition = function() {
    return this.latlng_;
  };

  function CustomMarker(latlng, map) {
   this.latlng_ = latlng;

     // Once the LatLng and text are set, add the overlay to the map.  This will
     // trigger a call to panes_changed which should in turn call draw.
     this.setMap(map);
   }



// POINT A AND POINT B


CustomPoint.prototype = new google.maps.OverlayView();
CustomPoint.prototype.draw = function() {
 var me = this;
     // Check if the div has been created.
     var div = this.div_;
     var text = this.text_;
     var latlng = this.latlng_;
     var className = this.className_;
     var geocoder = new google.maps.Geocoder;
     geocodeLatLng(geocoder,latlng, "." + className + ' .CustomSign-text');
     var innerDiv = '<div class="customSign-wrapper"><span class="CustomSign-label">'+ text +'</span><span class="CustomSign-text"></span></div>';

     if (!div) {
       // Create a overlay text DIV
       div = this.div_ = document.createElement('DIV');
       // Create the DIV representing our CustomPoint
       
       div.style.cursor = 'pointer';
       div.className = "customSign " + className;
       div.innerHTML = innerDiv;

       google.maps.event.addDomListener(div, "click", function(event) {
         google.maps.event.trigger(me, "click");
       });

       // Then add the overlay to the DOM
       var panes = this.getPanes();
       panes.overlayImage.appendChild(div);
     }

     // Position the overlay 
     var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
     if (point) {
       div.style.left = point.x + 'px';
       div.style.top = point.y + 'px';
     }
   };

   CustomPoint.prototype.remove = function() {
     // Check if the overlay was on the map and needs to be removed.
     if (this.div_) {
       this.div_.parentNode.removeChild(this.div_);
       this.div_ = null;
     }
   };


   CustomPoint.prototype.getPosition = function() {
    return this.latlng_;
  };

  function CustomPoint(latlng,  map, customContent, className) {
   this.latlng_ = latlng;
   this.text_ = customContent;
   this.className_ = className;
     // Once the LatLng and text are set, add the overlay to the map.  This will
     // trigger a call to panes_changed which should in turn call draw.
     this.setMap(map);
   }

   function geocodeLatLng(geocoder, latlngInput, el) {
    geocoder.geocode({'location': latlngInput}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          console.log(results[0].address_components);
          address = results[0].address_components[2].long_name + ", " + results[0].address_components[4].long_name;
          $(el).text(address);

        } else {
          address = "Location";
          $(el).text(address);
          return 'No results found';
        }
      } else {
        return 'Geocoder failed';
      }
    });
  }

  function cutString(addressName) {
    // var s = addressName;
    // var n = s.indexOf(',');
    // s = s.substring(0, n != -1 ? n : s.length);
    // return s;
    var s = addressName,
    delimiter = ',',
    start = 1,
    tokens = s.split(delimiter).slice(start),
    result = tokens.join(delimiter);
    return result;
  }



