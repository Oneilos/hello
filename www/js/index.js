var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('DOMContentLoaded', this.onDeviceReady.bind(this), false);
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {

        this.receivedEvent('deviceready');

        navigator.geolocation.watchPosition(function(position) {
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