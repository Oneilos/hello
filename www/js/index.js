/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        window.onerror = function(msg, url, lineNo, columnNo, error) {
            document.getElementById('error').innerHTML +=
                '<div>' +
                    '<div>' + msg + '</div>' +
                    '<div>' + error + '</div>' +
                '</div>';
        };
        document.addEventListener('DOMContentLoaded', this.onDeviceReady.bind(this), false);
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        navigator.geolocation.watchPosition(function(position) {
                document.getElementById('lat').innerHTML = position.coords.latitude;
                document.getElementById('lng').innerHTML = position.coords.longitude;
            },
            function error(err) {
                console.warn('ERROR(' + err.code + '): ' + err.message);
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