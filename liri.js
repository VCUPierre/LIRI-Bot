require("dotenv").config();
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var input = process.argv[2];

var commands = {
    'concert-this': true,
    'spotify-this-song': true,
    'movie-this': true,
    'do-what-it-says': true
}

if (commands[input]){
    console.log(input);
}