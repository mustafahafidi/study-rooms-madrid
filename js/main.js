console.log(dataJson);
var map;
function geoFindMe() {
  if (!navigator.geolocation) {
    // status.textContent = "Geolocation is not supported by your browser";
  } else {
    // status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(
      position => {
        const gpsLatLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        if (map) {
          map.setCenter(gpsLatLng);
          let marker = new google.maps.Marker({
            position: gpsLatLng,
            map: map
          });
        } else {
          console.log("Map not initialized");
        }
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  }
}
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: new google.maps.LatLng(40.410148, -3.7194382)
  });
  //   geoFindMe();
  new BlueDot(map, { icon: "./icons/cat.png" });

  var infoWindow = new google.maps.InfoWindow({
    content: ""
  });

  for (let i = 0; i < dataJson.length; i++) {
    let latLng = new google.maps.LatLng(
      dataJson[i].location.latitude,
      dataJson[i].location.longitude
    );
    let marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: i <= 5 ? "icons/green-marker.png" : undefined,
      title: "asd"
    });
    marker.addListener("click", () => {
      infoWindow.setContent(
        `<b>${dataJson[i].title}</b><br>${dataJson[i].organization.schedule}
        <br>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${dataJson[i].location.latitude},${dataJson[i].location.longitude}">Navigate to this</a>
        `
      );
      infoWindow.open(map, marker);
    });
  }
}
