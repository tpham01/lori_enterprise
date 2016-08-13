var geo_lat = null;
var geo_lng = null;

// sets your location as default
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var locationMarker = null;
    if (locationMarker){
      // return if there is a locationMarker bug
      return;
    }

    geo_lat = position.coords["latitude"];
    geo_lng = position.coords["longitude"];

   console.log(geo_lat, geo_lng);

  },
  function(error) {
    console.log("Error: ", error);
  },
  {
    enableHighAccuracy: true
  }
  );
}