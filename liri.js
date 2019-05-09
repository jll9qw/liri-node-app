require("dotenv").config();

var keys = require("./keys");
var moment = require('moment');

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

  var userSearch = process.argv.slice(3)
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
     console.log('='.repeat(process.stdout.columns)) + '\n\n';
 }

});
};


var getMovie = function(userSearch){

  userSearch = process.argv.slice(3).join('+')
// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t="+userSearch+"&y=&plot=short&apikey=trilogy";

// Default empty or null search for Mr. Nobody
if (userSearch === '' || userSearch === null || userSearch === undefined) {
  userSearch = 'Mr. Nobody'
}

axios.get(queryUrl).then(
  function(response) {
    console.log("Title:  "+ response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("IMDB Rating:  " + response.data.imdbRating);
    console.log("Country:  "+ response.data.Country) ;
    console.log("Language: " + response.data.Language);
    console.log("Plot:  "+ response.data.imdbRating);
    console.log("Actors:  "+ response.data.Actors);
    console.log('='.repeat(process.stdout.columns)) + '\n\n';
  });


};

var getConcert = function(userSearch){

var URL = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp"
axios.get(URL).then(function(response){

 
  for (var i = 0; i < response.data.length; i++) {
    console.log('Artist Name:  ' + response.data[0].lineup[0]);
    console.log('Venue:  '+ response.data[i].venue.name);
    console.log('City:  '+ response.data[i].venue.city);
    console.log('Country:  '+ response.data[i].venue.country)

   var showTime = response.data[i].venue.datetime;
   showTime = moment(showTime).format("MM/DD/YYYY")
    console.log('Date:  ' + showTime)
    console.log('='.repeat(process.stdout.columns)) + '\n\n';

 

  }
     

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
};
var runThis = function(arg1, arg2){
  pick(arg1, arg2);
};

runThis(caseData, userSearch);


function readFile(){
  fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
          return console.log(error);

}
var dataArr = data.split(',');
if (dataArr.length == 2){
  pick(dataArr[0], dataArr[1]);
}else if (dataArr.length == 1){
  pick(dataArr[0]);
}

});

readFile();
}
