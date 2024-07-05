// array will keep track of the order 
let order = [];
// order that player press light in
let playerOrder = [];
// number of flashes in the game
let flash = 0;
// keep track of the turn player is on
let turn;
// indicates whether player is doing well
let good;
// boolean true or false whether its player or comp turn
let compTurn;

let intervalId;

let strict = false;

let noise = true;

let on = false;

let win = false;

// pulling elements from html into script
const turnCounter = document.getElementById("turn");;
const button = document.getElementsByClassName("button");
const button1 = document.getElementsByClassName("b1"); // note this is pulled as an array
const button2 = document.getElementsByClassName("b2");
const button3 = document.getElementsByClassName("b3");
const button4 = document.getElementsByClassName("b4");

console.log(button4);
console.log(button[0]);
console.log(button);

//buttons
const powerBtn = document.getElementById("power");
const startBtn = document.getElementById("start");

// Turn on counter screen and also lights up buttons
powerBtn.addEventListener("click", function () {
    if (powerBtn.checked == true) { // checks if power button is checked
        on = true; // changes on value to true
        turnCounter.innerText = "---";
        for (let i = 0; i < button.length; i++) {
            button[i].style.opacity = '1';  //!would like buttons to turn on 1 by 1 through loop using some delay feature
        }
    } else {
        on = false;
        clearColor(); // to clear colour on the game
        clearInterval(intervalId); //TODO explain later
        turnCounter.innerText = ""; // makes counter go back to blank
        for (i = 0; i < button.length; i++) {
            button[i].style.opacity = '0.5';

        }

    }
    console.log(`on = ${on}`);
    console.log(`turnCounter.innerText = ${turnCounter.innerText}`);
    console.log(`button[i].style.opacity = ${button[0].style.opacity}`);
    // console.log(clearInterval(intervalId))
})


// start button is main button in the game
startBtn.addEventListener("click", function () {
    if (on || win) {   // if on or win equal true then play() , when power button is pressed on = true so code runs
        play(); //function defined later
    }
    console.log(`on = ${on}`);
    console.log(`win = ${win}`);
})

function play() {   // 
    win = false;
    order = [];   // this is the array which stores the random values
    playerOrder = []; // array which stores the players button presses
    flash = 0; // the number of times a button is flashed by the pc
    intervalId = 0;
    turn = 1; // starts on 1 
    turnCounter.innerText = 1; //displays the turn on the screen
    good = true;   // for loop generates 20 random numbers between 1-4 which are all inputted in the order array
    for (let i = 0; i < 30; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }

    compTurn = true; // this ensures that the computer plays a turn

    intervalId = setInterval(gameTurn, 800); //runs a function every 800ms, will keep repeating until interval is clear
    console.log(`order = ${order}`);
    console.log(`compTurn = ${compTurn}`);
}

function gameTurn() {
    on = false; // player cannot click buttons when on is set to false

    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false; // stops computers turn
        clearColor(); // clears any flashing colour
        on = true; // this allows player to press buttons
    }

    if (compTurn) {
        clearColor();
        // setTimeout does the task once withing 200ms 
        setTimeout(function () {
            if (order[flash] == 1) one(); // flash is 0 to begin which will pull a the first number from the order array
            if (order[flash] == 2) two(); // this will allow the computer to chose one of the colours
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++; // the flash is incremented by 1
        }, 200);
    }
}

// functions here, define the noise and the flashing of the colours
function one() {
    if (noise) {
        let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true;
    button1[0].style.backgroundColor = "#FF8488"; // must select button1 as an array
    console.log(`button1[0].style.backgroundColor = ${button1[0].style.backgroundColor}`)
}

function two() {
    if (noise) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    button2[0].style.backgroundColor = "#85C1E9";
    console.log(`button2[0].style.backgroundColor = ${button2[0].style.backgroundColor}`)
}

function three() {
    if (noise) {
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    button3[0].style.backgroundColor = "#FAD7A0";
    console.log(`button3[0].style.backgroundColor = ${button3[0].style.backgroundColor}`)
}

function four() {
    if (noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    button4[0].style.backgroundColor = "#A9DFBF";
    console.log(`button4[0].style.backgroundColor = ${button4[0].style.backgroundColor}`)
}

// function will reset all the colours to default
function clearColor() {
    button1[0].style.backgroundColor = "red";
    button2[0].style.backgroundColor = "blue";
    button3[0].style.backgroundColor = "orange";
    button4[0].style.backgroundColor = "green";
}

function flashColor() {
    button1[0].style.backgroundColor = "#FF8488";
    button2[0].style.backgroundColor = "#85C1E9";
    button3[0].style.backgroundColor = "#FAD7A0";
    button4[0].style.backgroundColor = "#A9DFBF";
}

console.log(button1);
console.log(button1[0].style.backgroundColor)

button1[0].addEventListener("click", function () {
    if (on) {
        playerOrder.push(1); // will add 1 to the playerOrder array registering the click
        check();
        one();
        if (!win) {
            setTimeout(clearColor, 300);
        }
    }
})

button2[0].addEventListener("click", function () {
    if (on) {
        playerOrder.push(2);
        check();
        two();
        if (!win) {
            setTimeout(function () {
                clearColor();
            }, 300);
        }
    }
})

button3[0].addEventListener("click", function () {
    if (on) {
        playerOrder.push(3);
        check();
        three();
        if (!win) {
            setTimeout(function () {
                clearColor();
            }, 300);
        }
    }
})

button4[0].addEventListener("click", function () {
    if (on) {
        playerOrder.push(4);
        check();
        four();
        if (!win) {
            setTimeout(function () {
                clearColor();
            }, 300);
        }
    }
})


function check() {
    if (playerOrder[playerOrder.length - 1] != order[playerOrder.length - 1])
        good = false;

    // if (playerOrder.length == 20 && good) {
    //     winGame();
    // }

    if (good == false) {
        flashColor();
        turnCounter.innerText = "NO!";
        let gameOver = document.getElementById("gameOver");
        gameOver.play();
        setTimeout(function () {
            turnCounter.innerText = turn;
            clearColor();
            play();
        }, 1000)

        noise = false;
    }

    if (turn == playerOrder.length && good) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0
        turnCounter.innerText = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}






console.log(playerOrder)