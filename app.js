// first we need to define all of our varibles using the querySelector.
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score')
const darthVader = document.querySelectorAll('.vader')
const countdownBoard= document.querySelector('.countdown')
const startButton = document.querySelector('.startButton');

// define the countdown, the last hole, a time limit, score, and a countdown leave timeUp undefined/false and make the time limit 30 seconds 
let timeUp = ""
let lastHole;
let timeLimit = 30000;
let score = 0;
let countdown;

// make a function that chooses a random hole using Math'.' 
function makeRandomHole(holes){
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes [randomHole];
    if (hole === lastHole) {
        return makeRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}

// make a funciton that makes a "vader" pop up from the hole.
function popUp(){
    const time = Math.random() * 1300 + 400;
    const hole = makeRandomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) 
        popUp();
    } , time);
}

//make a function to start the game that has a countdown timer of 30 seconds.
function startGame(){
    countdown = timeLimit/1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block'
    countdownBoard.textContent = countdown;
    score = 0;
    popUp();
    setTime(function(){
      timeUp === true;  
    }, timeLimit)

    // Make a function to start the countdown. It will activate once the user executes the click listener..
    startCountdown => setInterval(function(){
    countdown -=1;  
    $(countdownBoard).textContent = $('.countdown');
    if (countdown < 0 ) {
        countdown = 0;
        clearInterval(startCountdown);
        countdownBoard.textContent = "Game Over! You shoot like a Storm Trooper"
    }
    }, 1000);
} 

startButton.addEventListener('click', startGame());

//function saber()
saber => {
    score++;
    this.style.backGroundImage = "url('vader2.png')";
    setTimeOut(() => {
        this.style.backGroundImage = `url('vader1.png')`;
    }, 800)
}

$(darthVader).forEach(darthVader => darthVader.addEventListener('click', saber));