// load VIDEOGAMES from a server as JSON data
var creators = [];
var games = [];
var awards = [];
var allCreatorB = document.getElementById("creators");
var allGameB = document.getElementById("games");
var allAwardB = document.getElementById("awards");
var creators1 = document.getElementById("creators1");
var games1 = document.getElementById("games1");
var awards1 = document.getElementById("awards1");


//BUTTON FUNCTIONS
//used for video game edits
allCreatorB.onclick = function(){
    document.getElementById("creatorSentence").innerHTML = "All Creators";
    LoadCreators();
}
allGameB.onclick = function(){
    document.getElementById("gameSentence").innerHTML = "All Games";
    LoadGames();
}
allAwardB.onclick = function(){
    document.getElementById("awardSentence").innerHTML = "All Awards";
    LoadAwards();
}
creators1.onclick = function(){
    document.getElementById("creatorSentence").innerHTML = "Creators who are 20-29 and have sold at least 2 games and won at least one award";
    LoadCreators1();
}
games1.onclick = function(){
    document.getElementById("gameSentence").innerHTML = "Games that have a creator with a degree and at least 2 awards";
    LoadGames1();
}
awards1.onclick = function(){
    document.getElementById("awardSentence").innerHTML = "Awards that have been given to the survival genre from creators that don't have a degree";
    LoadAwards1();
}


function LoadCreators(){
    fetch("http://localhost:8080/VGDB/Creators").then(function(response){
        response.json().then(function(data){
            creators = data;
            console.log("creators", creators);
            var creatorBox = document.querySelector("#creatorBox");
            creatorBox.innerHTML = "";
            creators.forEach(function(creator){
                var newListItem = document.createElement("li");

                var nameDiv = document.createElement("div");
                var ageDiv = document.createElement("div");
                var degreeDiv = document.createElement("div");
    
                nameDiv.innerHTML = "<b><u>Name: </u></b>" + creator[0];
                newListItem.appendChild(nameDiv);
    
                ageDiv.innerHTML = "<b><u>Age: </u></b>" + creator[1];
                newListItem.appendChild(ageDiv);
    
                degreeDiv.innerHTML = "<b><u>Degree: </u></b>" + creator[2];
                newListItem.appendChild(degreeDiv);
    
                creatorBox.appendChild(newListItem);
            });
        });
    });
}

function LoadCreators1(){
    fetch("http://localhost:8080/VGDB/Creators1").then(function(response){
        response.json().then(function(data){
            creators = data;
            console.log("creators", creators);
            var creatorBox = document.querySelector("#creatorBox");
            creatorBox.innerHTML = "";
            creators.forEach(function(creator){
                var newListItem = document.createElement("li");

                var nameDiv = document.createElement("div");
                var ageDiv = document.createElement("div");
                var degreeDiv = document.createElement("div");
    
                nameDiv.innerHTML = "<b><u>Name: </u></b>" + creator[0];
                newListItem.appendChild(nameDiv);
    
                ageDiv.innerHTML = "<b><u>Age: </u></b>" + creator[1];
                newListItem.appendChild(ageDiv);
    
                degreeDiv.innerHTML = "<b><u>Degree: </u></b>" + creator[2];
                newListItem.appendChild(degreeDiv);
    
                creatorBox.appendChild(newListItem);
            });
        });
    });
}

function LoadGames(){
    fetch("http://localhost:8080/VGDB/Games").then(function(response){
        response.json().then(function(data){
            games = data;
            console.log("Games", games);
            var gameBox = document.querySelector("#gameBox");
            gameBox.innerHTML = "";
            games.forEach(function(game){
                var newListItem = document.createElement("li");

                var nameDiv = document.createElement("div");
                var creatorNameDiv = document.createElement("div");
                var copiesSoldDiv = document.createElement("div");
                var genreDiv = document.createElement("div");
    
                nameDiv.innerHTML = "<b><u>Name: </u></b>" + game[0];
                newListItem.appendChild(nameDiv);
    
                creatorNameDiv.innerHTML = "<b><u>Creator Name: </u></b>" + game[1];
                newListItem.appendChild(creatorNameDiv);
    
                copiesSoldDiv.innerHTML = "<b><u>Copies Sold: </u></b>" + game[2];
                newListItem.appendChild(copiesSoldDiv);

                genreDiv.innerHTML = "<b><u>Genre: </u></b>" + game[3];
                newListItem.appendChild(genreDiv);
    
                gameBox.appendChild(newListItem);
            });
        });
    });
}

function LoadGames1(){
    fetch("http://localhost:8080/VGDB/Games1").then(function(response){
        response.json().then(function(data){
            games = data;
            console.log("Games", games);
            var gameBox = document.querySelector("#gameBox");
            gameBox.innerHTML = "";
            games.forEach(function(game){
                var newListItem = document.createElement("li");

                var nameDiv = document.createElement("div");
                var creatorNameDiv = document.createElement("div");
                var copiesSoldDiv = document.createElement("div");
                var genreDiv = document.createElement("div");
    
                nameDiv.innerHTML = "<b><u>Name: </u></b>" + game[1];
                newListItem.appendChild(nameDiv);
    
                creatorNameDiv.innerHTML = "<b><u>Creator Name: </u></b>" + game[0];
                newListItem.appendChild(creatorNameDiv);
    
                copiesSoldDiv.innerHTML = "<b><u>Copies Sold: </u></b>" + game[3];
                newListItem.appendChild(copiesSoldDiv);

                genreDiv.innerHTML = "<b><u>Genre: </u></b>" + game[4];
                newListItem.appendChild(genreDiv);
    
                gameBox.appendChild(newListItem);
            });
        });
    });
}

function LoadAwards(){
    fetch("http://localhost:8080/VGDB/Awards").then(function(response){
        response.json().then(function(data){
            awards = data;
            console.log("Awards", awards);
            var awardBox = document.querySelector("#awardBox");
            awardBox.innerHTML = "";
            awards.forEach(function(award){
                var newListItem = document.createElement("li");

                var nameDiv = document.createElement("div");
                var gameNameDiv = document.createElement("div");
    
                nameDiv.innerHTML = "<b><u>Name: </u></b>" + award[0];
                newListItem.appendChild(nameDiv);
    
                gameNameDiv.innerHTML = "<b><u>Game Name: </u></b>" + award[1];
                newListItem.appendChild(gameNameDiv);
    
                awardBox.appendChild(newListItem);
            });
        });
    });
}

function LoadAwards1(){
    fetch("http://localhost:8080/VGDB/Awards1").then(function(response){
        response.json().then(function(data){
            awards = data;
            console.log("Awards", awards);
            var awardBox = document.querySelector("#awardBox");
            awardBox.innerHTML = "";
            awards.forEach(function(award){
                var newListItem = document.createElement("li");

                var nameDiv = document.createElement("div");
                var gameNameDiv = document.createElement("div");
    
                nameDiv.innerHTML = "<b><u>Name: </u></b>" + award[0];
                newListItem.appendChild(nameDiv);
    
                gameNameDiv.innerHTML = "<b><u>Game Name: </u></b>" + award[1];
                newListItem.appendChild(gameNameDiv);
    
                awardBox.appendChild(newListItem);
            });
        });
    });
}


//load videoGames from a server as JSON data
function loadVideoGames(){
    fetch("http://localhost:8080/FavoriteVideoGames").then(function(response){
        response.json().then(function(data){
        videoGames = data;
        console.log("video games from the server", videoGames);
        var videoGameList = document.querySelector("#video-game-list");
        videoGameList.innerHTML = "";
        videoGames.forEach(function(videoGame){
            var newListItem = document.createElement("li");

            var nameDiv = document.createElement("div");
            var characterDiv = document.createElement("div");
            var achievmentDiv = document.createElement("div");
            var ratingDiv = document.createElement("div");
            var difficultyDiv = document.createElement("div");

            nameDiv.innerHTML = "<b><u>Favorite Video Game: </u></b>" + videoGame.name;
            //nameDiv.classList.add("video-game-name");
            newListItem.appendChild(nameDiv);

            characterDiv.innerHTML = "<b><u>Character from Game: </u></b>" + videoGame.character;
            newListItem.appendChild(characterDiv);

            achievmentDiv.innerHTML = "<b><u>Numbered Achievment from Game: </u></b>" + videoGame.achievement;
            newListItem.appendChild(achievmentDiv);

            ratingDiv.innerHTML = "<b><u>Rating out of 10: </u></b>" + videoGame.rating;
            newListItem.appendChild(ratingDiv);

            difficultyDiv.innerHTML = "<b><u>Difficulty out of 10: </u></b>" + videoGame.difficulty;
            newListItem.appendChild(difficultyDiv);

            videoGameList.appendChild(newListItem);
        });
        });
    });
};

l//oadVideoGames();
//Call loading at the bottom

//Fix the Degree numbers