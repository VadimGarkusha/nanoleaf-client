var request = require('request');
var c = require('./const');

class NanoleafHttpClient {
    /**
     * 
     * @param {string} host Device local IP 
     * @param {string} token Authorization token
     */
    constructor(host, token) {
        this._token = token;
        this._host = new URL(`http://${host}:${c.NANOLEAF_PORT}/api/v1/${this._token}/`);
    }

    //private methods start with underscore

    /**
     * Authorize requests
     * 
     * @param {string} token Authorization token
     */
    authorize(token) {
        if(token) {
            this._token = token;
        }
    }

    /**
     * Send get request
     * 
     * @param {string} url 
     * @returns {void}
     */
    getRequest(url) {
        // console.log(`Path: ${this._host}`);
        // console.log(`Url: ${url}`);
        request.get(this._host + url, function(error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        });
    }
}

module.exports = NanoleafHttpClient;