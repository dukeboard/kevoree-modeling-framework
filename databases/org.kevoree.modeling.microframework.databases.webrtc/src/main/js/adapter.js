/*
 *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/**
 * Created by cyril on 13/02/15.
 * Based on https://github.com/webrtc/samples/blob/master/src/js/adapter.js
 */
'use strict';

var adaptator = {
    RTCPeerConnection :null,
    getUserMedia: null,

    attachMediaStream: null,
    reattachMediaStream: null,

    webrtcDetectedBrowser: null,
    webrtcDetectedVersion: null
};

adaptator.trace = function (text) { // This function is used for logging.
    if (text[text.length - 1] === '\n') {
        text = text.substring(0, text.length - 1);
    }
    if (window.performance) {
        var now = (window.performance.now() / 1000).toFixed(3);
        console.log(now + ': ' + text);
    } else {
        console.log(text);
    }
};

adaptator.adaptRTCapi = function() {
    if (navigator.mozGetUserMedia) {
        console.log('This appears to be Firefox');

        adaptator.webrtcDetectedBrowser = 'firefox';

        adaptator.webrtcDetectedVersion = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);

        // The RTCPeerConnection object.
        adaptator.RTCPeerConnection = function(pcConfig, pcConstraints) {
            // .urls is not supported in FF yet.
            if (pcConfig && pcConfig.iceServers) {
                for (var i = 0; i < pcConfig.iceServers.length; i++) {
                    if (pcConfig.iceServers[i].hasOwnProperty('urls')) {
                        pcConfig.iceServers[i].url = pcConfig.iceServers[i].urls;
                        delete pcConfig.iceServers[i].urls;
                    }
                }
            }
            return new mozRTCPeerConnection(pcConfig, pcConstraints);
        };

        // The RTCSessionDescription object.
        window.RTCSessionDescription = mozRTCSessionDescription;

        // The RTCIceCandidate object.
        window.RTCIceCandidate = mozRTCIceCandidate;

        // getUserMedia shim (only difference is the prefix).
        // Code from Adam Barth.
        adaptator.getUserMedia = navigator.mozGetUserMedia.bind(navigator);
        navigator.getUserMedia = getUserMedia;

        // Shim for MediaStreamTrack.getSources.
        MediaStreamTrack.getSources = function(successCb) {
            setTimeout(function() {
                var infos = [
                    {kind: 'audio', id: 'default', label:'', facing:''},
                    {kind: 'video', id: 'default', label:'', facing:''}
                ];
                successCb(infos);
            }, 0);
        };

        // Creates ICE server from the URL for FF.
        window.createIceServer = function(url, username, password) {
            var iceServer = null;
            var urlParts = url.split(':');
            if (urlParts[0].indexOf('stun') === 0) {
                // Create ICE server with STUN URL.
                iceServer = {
                    'url': url
                };
            } else if (urlParts[0].indexOf('turn') === 0) {
                if (webrtcDetectedVersion < 27) {
                    // Create iceServer with turn url.
                    // Ignore the transport parameter from TURN url for FF version <=27.
                    var turnUrlParts = url.split('?');
                    // Return null for createIceServer if transport=tcp.
                    if (turnUrlParts.length === 1 ||
                        turnUrlParts[1].indexOf('transport=udp') === 0) {
                        iceServer = {
                            'url': turnUrlParts[0],
                            'credential': password,
                            'username': username
                        };
                    }
                } else {
                    // FF 27 and above supports transport parameters in TURN url,
                    // So passing in the full url to create iceServer.
                    iceServer = {
                        'url': url,
                        'credential': password,
                        'username': username
                    };
                }
            }
            return iceServer;
        };

        window.createIceServers = function(urls, username, password) {
            var iceServers = [];
            // Use .url for FireFox.
            for (var i = 0; i < urls.length; i++) {
                var iceServer =
                    window.createIceServer(urls[i], username, password);
                if (iceServer !== null) {
                    iceServers.push(iceServer);
                }
            }
            return iceServers;
        };

        // Attach a media stream to an element.
        adaptator.attachMediaStream = function(element, stream) {
            console.log('Attaching media stream');
            element.mozSrcObject = stream;
        };

        adaptator.reattachMediaStream = function(to, from) {
            console.log('Reattaching media stream');
            to.mozSrcObject = from.mozSrcObject;
        };

    } else if (navigator.webkitGetUserMedia) {
        console.log('This appears to be Chrome');

        adaptator.webrtcDetectedBrowser = 'chrome';
        // Temporary fix until crbug/374263 is fixed.
        // Setting Chrome version to 999, if version is unavailable.
        var result = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
        if (result !== null) {
            adaptator.webrtcDetectedVersion = parseInt(result[2], 10);
        } else {
            adaptator.webrtcDetectedVersion = 999;
        }

        // Creates iceServer from the url for Chrome M33 and earlier.
        window.createIceServer = function(url, username, password) {
            var iceServer = null;
            var urlParts = url.split(':');
            if (urlParts[0].indexOf('stun') === 0) {
                // Create iceServer with stun url.
                iceServer = {
                    'url': url
                };
            } else if (urlParts[0].indexOf('turn') === 0) {
                // Chrome M28 & above uses below TURN format.
                iceServer = {
                    'url': url,
                    'credential': password,
                    'username': username
                };
            }
            return iceServer;
        };

        // Creates an ICEServer object from multiple URLs.
        window.createIceServers = function(urls, username, password) {
            return {
                'urls': urls,
                'credential': password,
                'username': username
            };
        };

        // The RTCPeerConnection object.
        adaptator.RTCPeerConnection = function(pcConfig, pcConstraints) {
            return new webkitRTCPeerConnection(pcConfig, pcConstraints);
        };

        // Get UserMedia (only difference is the prefix).
        // Code from Adam Barth.
        adaptator.getUserMedia = navigator.webkitGetUserMedia.bind(navigator);
        navigator.getUserMedia = getUserMedia;

        // Attach a media stream to an element.
        adaptator.attachMediaStream = function(element, stream) {
            if (typeof element.srcObject !== 'undefined') {
                element.srcObject = stream;
            } else if (typeof element.mozSrcObject !== 'undefined') {
                element.mozSrcObject = stream;
            } else if (typeof element.src !== 'undefined') {
                element.src = URL.createObjectURL(stream);
            } else {
                console.log('Error attaching stream to element.');
            }
        };

        adaptator.reattachMediaStream = function(to, from) {
            to.src = from.src;
        };
    } else {
        console.log('Browser does not appear to be WebRTC-capable');
    }
};
