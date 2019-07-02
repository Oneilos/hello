var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('DOMContentLoaded', this.onDeviceReady.bind(this), false);
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {

        this.receivedEvent('deviceready');

        var permissions = cordova.plugins.permissions;
        var geoloc = null;

        function error() {
            document.getElementById('error').innerHTML += '<div>No :(</div>';
        }

        function success( status ) {
            if (status.hasPermission && !geoloc) {

                geoloc = navigator.geolocation.watchPosition(function(position) {
                        document.getElementById('lat').innerHTML = position.coords.latitude;
                        document.getElementById('lng').innerHTML = position.coords.longitude;
                    },
                    function (error) {
                        console.warn(error);
                        document.getElementById('error').innerHTML += '<div>' + error.message + '</div>';
                    },{
                        maximumAge: 3000,
                        timeout: 5000,
                        enableHighAccuracy : true
                    }
                );

            } else {

                geoloc = navigator.geolocation.watchPosition(function(position) {
                        document.getElementById('lat').innerHTML = position.coords.latitude;
                        document.getElementById('lng').innerHTML = position.coords.longitude;
                    },
                    function (error) {
                        console.warn(error);
                        document.getElementById('error').innerHTML += '<div>' + error.message + '</div>';
                    },{
                        maximumAge: 3000,
                        timeout: 5000,
                        enableHighAccuracy : true
                    }
                );
                document.getElementById('error').innerHTML += '<div>Permission denied</div>';
            }
        }

        //permissions.requestPermission(permissions.LOCATION, success, error);
        permissions.requestPermissions([
            permissions.ACCESS_FINE_LOCATION,       // API LVL 1
            permissions.ACCESS_COARSE_LOCATION,     // API LVL 1
            permissions.ACCESS_BACKGROUND_LOCATION  // API LVL 29
        ], function () {

            permissions.checkPermission(permissions.ACCESS_FINE_LOCATION, success, error);
            permissions.checkPermission(permissions.ACCESS_COARSE_LOCATION, success, error);
            permissions.checkPermission(permissions.ACCESS_BACKGROUND_LOCATION, success, error);

        }, error);

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();