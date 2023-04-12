// load VIDEOGAMES from a server as JSON data
var videoGames = [];
allCreatorB = document.getElementById("creator")
allGameB = document.getElementById("games")
allAwardB = document.getElementById("awards")
var submitButton = document.querySelector("#submit");
var videoGameInput = document.querySelector("#favorite-video-games");
var characterInput = document.querySelector("#favorite-video-character");
var achievmentInput = document.querySelector("#favorite-video-achievment");
var ratingInput = document.querySelector("#favorite-video-rating");
var difficultyInput = document.querySelector("#favorite-video-difficulty");
var editSubmit = document.querySelector("#edit-submit");

//BUTTON FUNCTIONS
//used for video game edits
editSubmit.onclick = function(){
    console.log("confirm edit button was clicked");
    //Call the edit stuff
    editVideoGameFromServer(idValue,videoGameInput.value,characterInput.value,achievmentInput.value,ratingInput.value,difficultyInput.value);
    //then clean up the edit page
    document.getElementById("edit-title").hidden = true;
    document.getElementById("edit-submit").hidden = true;
    document.getElementById("submit").hidden = false;
    videoGameInput.value = "";
    characterInput.value = "";
    achievmentInput.value = "";
    ratingInput.value = "";
    difficultyInput.value = "";
}
//used for video game creation
submitButton.onclick = function(){
    var videoGameName = videoGameInput.value;
    var character = characterInput.value;
    var achievment = achievmentInput.value;
    var rating = ratingInput.value;
    var difficulty = difficultyInput.value;
    createVideoGame(videoGameName,character,achievment,rating,difficulty);
    videoGameInput.value = "";
    characterInput.value = "";
    achievmentInput.value = "";
    ratingInput.value = "";
    difficultyInput.value = "";
};

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
            
        
            ////////////////////////////////////////////////////////////////
            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.onclick = function(){
                console.log("delete button was clicked",videoGame.id);

                //ask user if they really want to delete
                if(confirm("Are you sure?")){
                    deleteVideoGameFromServer(videoGame.id);
                }
            }
            newListItem.appendChild(deleteButton);

            var editButton = document.createElement("button");
            editButton.innerHTML = "Edit";
            editButton.onclick = function(){
                console.log("edit button was clicked",videoGame.id);
                displayEditForm(videoGame);
                window.idValue = videoGame.id;
            }
            newListItem.appendChild(editButton);

            videoGameList.appendChild(newListItem);
        });
        });
    });
};

loadVideoGames();