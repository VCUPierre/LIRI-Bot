require("dotenv").config();
var keys = require("./keys.js");

var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var inputCommand = process.argv[2];
var input = "";

for (let i = 3; i < process.argv.length; i++){
    if (process.argv[i + 1]){
        input += process.argv[i];
        input += " ";
    } else {
        input += process.argv[i];
    }
}
//console.log(input);

/*var commands = {
    'concert-this': concertThis(),
    'spotify-this-song': spotifyThis(),
    'movie-this': true,
    'do-what-it-says': true
}*/
if (inputCommand === 'spotify-this-song'){
    spotifyThis();
} else if (inputCommand === 'concert-this'){
    concertThis();
} else if (inputCommand === 'movie-this'){
    movieThis();
}

//commands[inputCommand];

function concertThis(){
    
    axios.get('https://rest.bandsintown.com/artists/' +input+ '/events?app_id=codingbootcamp')
    .then(function (response) {
        //console.log(response);
        let results = response.data;
        let lineup = JSON.stringify(results[0].lineup);
        let venue = JSON.stringify(results[0].venue.name);
        let location = JSON.stringify(results[0].venue.city);
        let date = moment(results[0].datetime).format('MM/DD/YYYY');

        console.log(lineup);
        console.log(venue);
        console.log(location);
        console.log(date);
  });
    //return true;
}

function spotifyThis(){
    spotify.search({ type: 'track', query: input, limit: 1 }, function(err, response) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var results = response.tracks.items;
        console.log(results[0].album.name);
        console.log(results[0].artists[0].name);
        console.log(results[0].preview_url);
        console.log(results[0].name);
      //console.log(results); 
    });
}

function movieThis(){
    var key = 'd37e3471';
    
    axios.get('http://www.omdbapi.com/?apikey='+key+'&t='+input)
    .then(function (response) {
        var results = response.data;
        //console.log(results);
        console.log("Title: "+results.Title);
        console.log("Year: "+results.Year);
        console.log("IMDB Rating: "+results.imdbRating);
        console.log("Rotten-Tomatoes Rating: "+results.Ratings[1].Value);
        console.log("Country: "+results.Country);
        console.log("Language: "+results.Language);
        console.log("Plot: "+results.Plot);
        console.log("Cast: "+results.Actors);
    });
}