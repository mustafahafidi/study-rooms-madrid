!(function() {
  "use strict";
  function o(o, t) {
    var n = this;
    (n.code = o),
      (n.reason = t instanceof Error ? t : null),
      (n.message = t instanceof Error ? t.message : t),
      (n.stack = new Error().stack);
  }
  var t = { enableHighAccuracy: !1, timeout: 8e3, maximumAge: 3e3 };
  (o.prototype = Object.create(Error.prototype)),
    (o.prototype.constructor = o),
    (window.BlueDot = function(n, e) {
      var r = this;
      (e = e || {}),
        (e.icon =
          e.icon ||
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAQlBMVEVMaXFCiv9Civ9Civ9Civ9Civ9Civ9Civ9Civ+Kt/9+r/9Pkv90qf9hnf9Civ9wpv9Ee/+Jtf9Gjf9/sP9Kj/9KXf+JdfukAAAACXRSTlMAGCD7088IcsuTBctUAAAAYUlEQVR4XlWOWQrAIBBDx302d73/VSu0UMxfQsgLAMSEzmGKcGRCkZylBHPyMJQmk44QIRWdVCuxlgQoRNLaoi4ILs/a9m6VszuGf4PSaX21eyD6oZ256/AHa/0L9RauOw+4XAWqGLX26QAAAABJRU5ErkJggg=="),
        (e.on = e.on || {}),
        (e.on.geolocationError = e.on.geolocationError || function(o) {}),
        (e.on.firstGeolocationUpdate =
          e.on.firestgeolocationUpdate || function(o) {}),
        (e.on.geolocationUpdate = e.on.geolocationUpdate || function(o) {}),
        (r.options = e),
        (r.marker = null),
        (r.updateLocation = function(o) {
          var t = o.coords,
            i = { lat: t.latitude, lng: t.longitude };
          null === r.marker
            ? ((r.marker = new google.maps.Marker({
                map: n,
                position: i,
                icon: e.icon
              })),
              n.setCenter(i),
              e.on.firstGeolocationUpdate(o))
            : (r.marker.setPosition(i), e.on.geolocationUpdate(o));
        }),
        (r.error = function(t) {
          e.on.geolocationError(new o(t.code, t));
        }),
        navigator.geolocation
          ? navigator.geolocation.watchPosition(r.updateLocation, r.error, t)
          : e.on.geolocationError(
              new o(101, "Geolocation is not supported on this browser")
            );
    });
})();
