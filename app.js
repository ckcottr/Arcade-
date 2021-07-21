// first we need to define all of our varibles using the querySelector.
$(document).ready(function () {

    const holes = $('.hole');
    const scoreBoard = $('.score');
    const countdownBoard= $('.countdown');
    const darthVader = $('.vader');


// define the countdown, the last hole, a time limit, score, and a countdown leave timeUp undefined/false and make the time limit 30 seconds 
    let timeUp = ""
    let lastHole;
    let timeLimit = 30000;
    let score = 0;
    let countdown = 0;

// make a function that chooses a random hole using Math'.' 
    function makeRandomHole(){
        const randomHole = Math.floor(Math.random() * holes.length);
        const hole = holes.eq(randomHole);
        if (hole === lastHole){
            return makeRandomHole(); 

        } else { 
            lastHole = hole
            return hole;

        }
    }

// make a funciton that makes a "vader" pop up from the hole.
    function popUp(){
            const time = Math.floor(Math.random() * 1300 + 400);
            const hole = makeRandomHole();
            hole.addClass('up');
            setTimeout(() => {
                hole.removeClass('up');
                if (!timeUp){
                    popUp();
                }   
            } , time);
        }

//make a function to start the game that has a countdown timer of 30 seconds.
//couple of quick notes before you read this block of code.. I was unsuccessful at making an audio file called "force" to play once the start button is clicked.
    function startGame(){
        countdown = timeLimit/1000;
        $('.score').text(0);
        $('.score').show();
        score = 0;
        popUp();
        startCountdown();
    }
// Make a function to start the countdown. It will activate once the user executes the click listener..
    function startCountdown(){
        setInterval(function(){
            countdown -=1;  
            countdownBoard.text(countdown);
            if (countdown < 0 ) {
                countdown = 0;
                clearInterval(startCountdown);
                countdownBoard.text("Game Over! You shoot like a Storm Trooper!") 
            }
        }, 1000);
        
    } 
    
// This function saber is updated the score board each time a "vader" is clicked.
    function saber(e){
        scoreBoard.text(score++);
        $(e.target).css('background-image', "url('../images/vader2.png')")
        setTimeout(() => {
            $(e.target).css('background-image', "url('../images/vader1.png')")
            $(e.target).one('click',saber);
        }, 800)
    }
// This line of code sets the event to call saber.
    for (let i = 0; i < darthVader.length; i++){
        darthVader.eq(i).one('click',saber);
    };
    $('.startButton').click(startGame);
})