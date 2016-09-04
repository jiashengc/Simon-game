$(document).ready(function() {

  var gameArray = [],
    playerArray = [];
  var game = false, 
      ready = false,
      strict = false, 
      correct = false;
  var tlSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
  var trSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
  var blSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
  var brSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
  var choice, n, i;

  // Functions
  function gameStart() {
    if (game == false) {
      $(".start").addClass("stcolor");
      game = true, ready = false, correct = true, n = 0, i = 0;
      gameArray = [], playerArray = [];
      gameStart();
    } else {
      if (correct == true) {
        choice = randomChoice();
        gameArray.push(choice);
      }
      if (gameArray.length >= 21) {
        confirm("You win!");
        game = false;
        gameStart();
      }
      n = 0;

      setTimeout(function() {
        console.log("n: " + n)
        console.log("New Array: " + gameArray);
        playSound(gameArray, n);
        $(".no").text(gameArray.length);
      }, 2000);

      ready = true;
    } // End of else statement
  } // End of gameStart()

  function randomChoice() {
    min = 0;
    max = 3;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } // End of randomChoice()

  function playSound(gameArray, g) {

    console.log("Sound: " + gameArray[g]);
    switch (gameArray[g]) {
      case 0:
        $(".topleft").addClass("tlcolor");
        tlSound.play();
        break;
      case 1:
        $(".topright").addClass("trcolor");
        trSound.play();
        break;
      case 2:
        $(".bottomleft").addClass("blcolor");
        blSound.play();
        break;
      case 3:
        $(".bottomright").addClass("brcolor");
        brSound.play();
        break;
      default:
        console.log("Error: gameArray choices");
    } // End of switch(gameArray[n])

    removeColor();
    console.log("N: " + n);
    
    n += 1;

    setTimeout(function() {
      if (n < gameArray.length) {
        playSound(gameArray, n);
      }
    }, 1300);

  } // End of playSound()

  function playerClick(choice) {

    console.log(choice);
    switch (choice) {
      case 0:
        $(".topleft").addClass("tlcolor");
        tlSound.play();
        break;
      case 1:
        $(".topright").addClass("trcolor");
        trSound.play();
        break;
      case 2:
        $(".bottomleft").addClass("blcolor");
        blSound.play();
        break;
      case 3:
        $(".bottomright").addClass("brcolor");
        brSound.play();
        break;
      default:
        console.log("Error: Player choices");
    }

    removeColor();

    if (choice != gameArray[i]) {
      console.log("False!");
      tlSound.play();
      trSound.play();
      blSound.play();
      brSound.play();
      ready = false;
      correct = false;
      // Check if strict or not
      if (strict == true) {
        game = false;
        $(".no").text("!!");
        setTimeout(function() {
          $(".no").text("0");
          gameStart();
        }, 2000);
      } // End of (strict == true) if statement
      else {
        ready = false;
        i = 0;
        $(".no").text("!!");
        setTimeout(function() {
          $(".no").text(gameArray.length);
          gameStart();
        }, 1500);
      }
    } // End of (choice != gameArray[i]) if statment
    else if (choice == gameArray[i]) {
      console.log("True!");
      i += 1;
      if (i >= gameArray.length) {
        correct = true;
        i = 0;
        gameStart();
      }
    } else {
      console.log("Error: Game Stuck at Player Choice");
    }

  } // End of playerClick(choice)

  function removeColor() {
    setTimeout(function() {
      $(".topleft").removeClass("tlcolor");
      $(".topright").removeClass("trcolor");
      $(".bottomleft").removeClass("blcolor");
      $(".bottomright").removeClass("brcolor");
    }, 1000);
  } // End of removeColor()

  // Clickable buttons
  $(".start").click(function() {
    game = false;
    $(".no").text("0");
    gameStart();
  });

  $(".strict").click(function() {
    if (this.checked) {
      strict = true;
    } else {
      strict = false;
    }
  });

  $(".topleft").click(function() {
    if (ready == true) {
      playerClick(0);
    }
  });

  $(".topright").click(function() {
    if (ready == true) {
      playerClick(1);
    }
  });

  $(".bottomleft").click(function() {
    if (ready == true) {
      playerClick(2);
    }
  });

  $(".bottomright").click(function() {
    if (ready == true) {
      playerClick(3);
    }
  });

});