// Assign main variable
const section = document.getElementById("main");

// Assign variables connected to winner box
let win = document.querySelector(".win-box");
let winBtn = document.getElementById("winBtn");

// Assign variables connected to timeout box
let timeOut = document.querySelector(".timeout");
let timeOutBtn = document.getElementById("timeOutBtn");

// Assign variables connected to indicators
const timeIndicator = document.querySelector(".timeIndicator");
let attemptIndicator = document.querySelector(".attemptIndicator");
let timeCount = 80;
let attemptCount = 0;
let timer;

// Assign sound variables
const timeOutSound = new Audio("sounds/oh-no.mp3");
const winSound = new Audio("sounds/winner.mp3");
const clickedSound = new Audio("sounds/click.mp3");


// Link time context
let remainingTime = timeCount;

// Link indicator context
attemptIndicator.textContent = attemptCount;


// Create the data of images
function imageData() {
    return [
        { imgSrc: "./assets/card1.png", name: "card-1" },
        { imgSrc: "./assets/card2.png", name: "card-2" },
        { imgSrc: "./assets/card3.png", name: "card-3" },
        { imgSrc: "./assets/card4.png", name: "card-4" },
        { imgSrc: "./assets/card5.png", name: "card-5" },
        { imgSrc: "./assets/card6.png", name: "card-6" },
        { imgSrc: "./assets/card7.png", name: "card-7" },
        { imgSrc: "./assets/card8.png", name: "card-8" },
        { imgSrc: "./assets/card9.png", name: "card-9" },
        { imgSrc: "./assets/K3.png", name: "K3" },
        { imgSrc: "./assets/K4.png", name: "K4" },
        { imgSrc: "./assets/card1.png", name: "card-1" },
        { imgSrc: "./assets/card2.png", name: "card-2" },
        { imgSrc: "./assets/card3.png", name: "card-3" },
        { imgSrc: "./assets/card4.png", name: "card-4" },
        { imgSrc: "./assets/card5.png", name: "card-5" },
        { imgSrc: "./assets/card6.png", name: "card-6" },
        { imgSrc: "./assets/card7.png", name: "card-7" },
        { imgSrc: "./assets/card8.png", name: "card-8" },
        { imgSrc: "./assets/card9.png", name: "card-9" },
        { imgSrc: "./assets/K3.png", name: "K3" }
    ];
}

// Random function
function getRandom() {
    const card = imageData();

    card.sort(function () {
        return 0.5 - Math.random();
    });
    return card;
};

// Function for creating card
function cardMaker() {
    const card = getRandom();

    // Create HTML structure for card
    card.map(function (item) {

        const card = document.createElement('div');
        const front = document.createElement("img");
        const back = document.createElement("div");

        card.classList = "card";
        front.classList = "front";
        back.classList = "back";

        // Add info to card elements
        front.src = item.imgSrc;
        card.setAttribute("name", item.name);

        // Attach the card to the section
        section.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', function (e) {
            card.classList.toggle('toggleCard');
            verifyCards(e);
        });
    });
};




// Verify Cards
function verifyCards(e) {
    const clickedCard = e.target;

    // Increase the number of attempts
    if (win.style.display === "none") {
        attemptCount++;
        attemptIndicator.textContent = attemptCount;
        clickedSound.play();
    }


    // Define reverted cards and assign variable
    clickedCard.classList.add("reverted");
    const revertedCards = document.querySelectorAll(".reverted");


    // Check last one
    revertedCards.forEach(function (one) {
        if (one.getAttribute("name") == "K4") {

            const allCardsRevealed = document.querySelectorAll('.card:not(.hideCard)').length === 1;
            console.log(allCardsRevealed);

            // Determine the appearance of the winner box
            if (allCardsRevealed) {
                clearInterval(timer);
                win.style.display = "block";
                winSound.play();
            }

        }
    });

    // Revert logic
    if (revertedCards.length === 2) {
        const name1 = revertedCards[0].getAttribute("name");
        const name2 = revertedCards[1].getAttribute("name");

        if (name1 === name2) {
            // Similar cards
            revertedCards.forEach(function (card) {
                card.classList.add("hideCard");
                card.classList.remove("reverted");
            });
        } else {
            // Different cards
            setTimeout(function () {
                revertedCards.forEach(function (card) {
                    card.classList.remove("reverted");
                    card.classList.remove("toggleCard");
                });
            }, 650);

        }
    }

}


// Function for restarting 
function restart() {

    let card = getRandom();
    let fronts = document.querySelectorAll(".front");
    let cards = document.querySelectorAll(".card");

    card.map(function (item, index) {
        cards[index].classList.remove("toggleCard", "hideCard", "reverted");

        // Set random function

        fronts[index].src = item.imgSrc;
        cards[index].setAttribute("name", item.name);


        // Hide the winner and timeout box
        win.style.display = "none";
        timeOut.style.display = "none";

        // Stop the ongoing timer
        clearInterval(timer);

    });

    return [
        attemptCount = 0,
        attemptIndicator.textContent = attemptCount,
        remainingTime = timeCount,
        startTimer()
    ]
}


// Start the time
function startTimer() {
    timer = setInterval(function () {
        remainingTime--;

        timeIndicator.textContent = remainingTime;

        if (0 >= remainingTime) {
            clearInterval(timer);
            timeOut.style.display = "block";
            timeOutSound.play();
            hideCards();
        }

    }, 1000);
}

function hideCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        card.style.display = 'none';
    });
}

function showCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        card.style.display = 'block';
    });
}


// Restart the game by clicking button
timeOutBtn.addEventListener("click", function () {
    restart();
    showCards();
});
winBtn.addEventListener("click", restart);

startTimer();
cardMaker();