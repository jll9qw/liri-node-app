require("dotenv").config();

var keys = require("./keys");


// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");


// Node pattern for Spotify
var Spotify = require('node-spotify-api');


// CaseData variable
var caseData = process.argv[2];

// Variable for user search input
var userSearch = process.argv.slice(3).join('');








 
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});


var artistName = function(artist){
  return artist.name;

}


var spotifyThis = function(userSearch){
 spotify.search({ type: 'track', query: userSearch }, function(err, data) {
  if (err) {
      console.log('Error occurred: ' + err);
      return;
    
  }
  
 var songs = data.tracks.items;
 for (var i = 0; i < songs.length; i++){
     console.log(i);
     console.log('Artist: ' + songs[i].artists.map(artistName));
     console.log('Song Name: '+ songs[i].name);
     console.log('Preview Song: ' + songs[i].preview_url)
     console.log('Album: ' + songs[i].album.name)
     console.log('-'.repeat(process.stdout.columns)) + '\n\n';
 }

});
}


var getMovie = function(userSearch){

  userSearch = process.argv.slice(3).join('+')
// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t="+userSearch+"&y=&plot=short&apikey=trilogy";


axios.get(queryUrl).then(
  function(response) {
    console.log("Release Year: " + response.data.Year);
  });
}

var getConcert = function(userSearch){

var URL = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp"
axios.get(URL).then(function(response){
console.log(response)
});
}


// Switch case function 
var pick = function(caseData, functionData){
    switch(caseData) {
        case 'spotify-this-song':
          spotifyThis(functionData);
          break; 
          case 'movie-this':
          getMovie(functionData);
          break;
          case 'concert-this':
          getConcert(functionData);
          break;
        default:
         console.log('LIRI does not know that');
  }
}
var runThis = function(arg1, arg2){
  pick(arg1, arg2);
}

runThis(caseData, userSearch)




