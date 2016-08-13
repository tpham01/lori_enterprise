
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var point =  new google.maps.LatLng(-4.05, 39.6667);


function initialize() {

  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom:7,
    mapTypeControl: false,
    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
    },
    streetViewControl: false
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsDisplay.setMap(map);

  // Place a marker
  overlay = new CustomMarker(point, map);

}

  function calcRoute() {
    var start = "nairobi, kenya"
    var end = "Kilindini Harbour"
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
       div.style.borderRadius = '50%';
       div.style.boxShadow = '10px 10px 20px 0px rgba(0,0,0,0.75)';

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

  function CustomMarker(latlng,  map) {
     this.latlng_ = latlng;

     // Once the LatLng and text are set, add the overlay to the map.  This will
     // trigger a call to panes_changed which should in turn call draw.
     this.setMap(map);
   }

  $(document).ready(function(){

    initialize();
    map.set('styles', mapStyle);
    calcRoute();

  });




