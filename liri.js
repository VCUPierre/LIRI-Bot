require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
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
commandCheck(inputCommand, input);

function commandCheck(inputCommand, input) {

    if (inputCommand === 'spotify-this-song'){
        spotifyThis(input);
    } else if (inputCommand === 'concert-this'){
        concertThis(input);
    } else if (inputCommand === 'movie-this'){
        movieThis(input);
    } else if (inputCommand === 'do-what-it-says'){
        doThis();
    } else {
        console.log("\n*** Sorry, Command not recognized ***\n");
    }
}

function concertThis(input){
    if (input){
        axios.get('https://rest.bandsintown.com/artists/' +input+ '/events?app_id=codingbootcamp')
        .then(function (response) {
            //console.log(response);
            let results = response.data;
            
            console.log("- - - - - - - - - - - - - - - -");
            console.log("   "+input+" Event Search   ");
            console.log("- - - - - - - - - - - - - - - -");
        
            if (results.length) {
                for (let i = 0; i < results.length; i++){
                    let date = moment(results[i].datetime).format('MM/DD/YYYY');

                    console.log("\nEvent Lineup: "+results[i].lineup);
                    console.log("Venue: "+results[i].venue.name);
                    console.log("Venue Location: "+results[i].venue.city);
                    console.log("Event Date: "+date);
                    console.log("\n-------");
                }
            } else {
                    console.log("\nThere was no event found for "+input+".\n");
            }
        });
    } else {
        console.log("Please provide band or artist. e.g (concert-this the wonder years)");
    }
    //return true;
}

function spotifyThis(input){
    if (!input){
        input = 'The Sign ace of base';
    }
    spotify.search({ type: 'track', query: input, limit: 1 }, function(err, response) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var results = response.tracks.items;
        console.log("- - - - - - - - - - -");
        console.log("    Spotify Search   ");
        console.log("- - - - - - - - - - -");
        console.log("Artist: "+results[0].artists[0].name);
        console.log("Song Name: "+results[0].name);
        console.log("Link :"+results[0].external_urls.spotify);
        console.log("Album: "+results[0].album.name);
      //console.log(results); 
    });
}

function movieThis(input){
    if (!input){
        input = 'Mr. Nobody';
    }
    var key = 'd37e3471';
    
    axios.get('http://www.omdbapi.com/?apikey='+key+'&t='+input)
    .then(function (response) {
        var results = response.data;
        //console.log(results);
        console.log("- - - - - - - - - - -");
        console.log("    Movie Search   ");
        console.log("- - - - - - - - - - -");
        console.log("Movie Title: "+results.Title);
        console.log("Cast: "+results.Actors);
        console.log("Year Released: "+results.Year);
        console.log("Language: "+results.Language);
        console.log("Country: "+results.Country);
        console.log("\nIMDB Rating: "+results.imdbRating);
        console.log("Rotten-Tomatoes Rating: "+results.Ratings[1].Value);
        console.log("\nPlot: "+results.Plot+"\n");
        
    });
}

function doThis() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }

        var dataArr = data.split(",");
        
        commandCheck(dataArr[0],dataArr[1].replace(/['"]+/g, '')); // added a reg expression to remove any " " from string
      });
}