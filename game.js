var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = 0;
var gamePattern = [];

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(userClickedPattern);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = 0;
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[userClickedPattern.length-1] == gamePattern[gamePattern.length-1]) {
    setTimeout(nextSequence, 1000);//Right
    level = ++level;
    $("#level-title").html("Level " + level);
  } else {//Wrong
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("GAME OVER at Level " + level + ". Press any button/Key to restart.");
    startOver();
  }
}

$(".btn").click(function() {
  if (started == 0) {
    $("#level-title").html("Level " + level);
    nextSequence();
    started = 1;
  }else{
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    setTimeout(function() {
      $("#" + userChosenColour).removeClass("pressed");
    }, 100)
    console.log(userClickedPattern);
    checkAnswer(level);
  }
});
$(document).keypress(function() {
  if (started == 0) {
    $("#level-title").html("Level " + level);
    nextSequence();
    started = 1;
  }
});
