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
    //Call the web function like
    // editVideoGameFromServer(idValue,videoGameInput.value,characterInput.value,achievmentInput.value,ratingInput.value,difficultyInput.value);
}
allGameB.onclick = function(){
    document.getElementById("gameSentence").innerHTML = "All Games";
}
allAwardB.onclick = function(){
    document.getElementById("awardSentence").innerHTML = "All Awards";
}
creators1.onclick = function(){
    document.getElementById("creatorSentence").innerHTML = "Creators who are 20-29 and have sold at least 2 games and won at least one award";
}
games1.onclick = function(){
    document.getElementById("gameSentence").innerHTML = "Games that have a creator with a degree and at least 2 awards";
}
awards1.onclick = function(){
    document.getElementById("awardSentence").innerHTML = "Awards that have been given to the survival genre from creators that don't have a degree";
}


//create a new video game on the server
function createVideoGame(videoGameName,videoGameCharacter, videoGameAchievment,rating,difficulty){
    var data = "name=" + encodeURIComponent(videoGameName);
    data += "&character=" + encodeURIComponent(videoGameCharacter);
    data += "&achievment=" + encodeURIComponent(videoGameAchievment);
    data += "&rating=" + encodeURIComponent(rating);
    data += "&difficulty=" + encodeURIComponent(difficulty);
    console.log("this is the data I am going to send to the server", data);

    fetch("http://localhost:8080/FavoriteVideoGames",{
        method: 'POST',
        body:data,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }).then(function(response){
        loadVideoGames();
    });
};

//deletes a video game 
function deleteVideoGameFromServer(videoGameId){
    fetch("http://localhost:8080/FavoriteVideoGames/"+videoGameId,{
        method: "DELETE"
    }).then(function(response){
        if(response.status == 200){
            console.log("the video game was successfully deleted");
            loadVideoGames();
        }
    });
}

//edits a member
function editVideoGameFromServer(videoGameId,name,character,achievment,rating,difficulty){
    var data = "id="+ encodeURIComponent(videoGameId);
    data += "&name=" + encodeURIComponent(name);
    data += "&character=" + encodeURIComponent(character);
    data += "&achievment=" + encodeURIComponent(achievment);
    data += "&rating=" + encodeURIComponent(rating);
    data += "&difficulty=" + encodeURIComponent(difficulty);
    console.log(data);
    fetch("http://localhost:8080/FavoriteVideoGames/"+videoGameId,{
        method: "PUT",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data
    }).then(function(response){
        if(response.status == 200){
            console.log("the video game was successfully edited");
            loadVideoGames();
        }
    });
}

//used for editing
function displayEditForm(videoGame){
    document.getElementById("edit-title").hidden = false;
    document.getElementById("submit").hidden = true;
    document.getElementById("edit-submit").hidden = false;

    videoGameInput.value = videoGame.name;
    characterInput.value = videoGame.character;
    achievmentInput.value = videoGame.achievement;
    ratingInput.value = videoGame.rating;
    difficultyInput.value = videoGame.difficulty;
};

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

loadVideoGames();