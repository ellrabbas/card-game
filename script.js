// Assign variables
const section = document.querySelector("section");
const timeIndicator = document.querySelector(".timeIndicator");
let win = document.querySelector(".win");
let winBtn = document.getElementById("winBtn");
let timeOut = document.querySelector(".time");
let timeOutBtn = document.getElementById("timeOutBtn");
let timeCount = 25;
let timer;

//Link time context
let remainingTime = timeCount;


// Create the data of images
function getData() {
    return [
        { imgSrc: "./assets/card1.png", name: "card-1" },
        { imgSrc: "./assets/card2.png", name: "card-2" },
        { imgSrc: "./assets/card3.png", name: "card-3" },
        { imgSrc: "./assets/K3.png", name: "K3" },
        { imgSrc: "./assets/K4.png", name: "K4" },
        { imgSrc: "./assets/card1.png", name: "card-1" },
        { imgSrc: "./assets/card2.png", name: "card-2" },
        { imgSrc: "./assets/card3.png", name: "card-3" },

        { imgSrc: "./assets/K3.png", name: "K3" }
    ];
}

// Random function
function randomize() {
    const cardData = getData();

    cardData.sort(function () {
        return Math.random() - 0.5;
    });
    return cardData;
};

// Card generator function
function cardGenerator() {
    const cardData = randomize();

    // Create HTML
    cardData.forEach(function (item) {
        const card = document.createElement('div');
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";

        // Add info to elements
        face.src = item.imgSrc;
        card.setAttribute("name", item.name);

        // Attach the card to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', function (e) {
            card.classList.toggle('toggleCard');
            checkCards(e);
        });
    });
};




// Check Cards
function checkCards(e) {
    const clickedCard = e.target;
    clickedCard.classList.add("reverted");
    const revertedCards = document.querySelectorAll(".reverted");


    revertedCards.forEach(function (one) {
        if (one.getAttribute("name") == "K4") {

            const allCardsRevealed = document.querySelectorAll('.card:not(.hideCard)').length === 1;

            if (allCardsRevealed) {
                clearInterval(timer);
                win.style.display = "block";
            }

        }
    });

    // Revert logic
    if (revertedCards.length === 2) {
        const name1 = revertedCards[0].getAttribute("name");
        const name2 = revertedCards[1].getAttribute("name");

        if (name1 === name2) {
            // Matching cards
            revertedCards.forEach(function (card) {
                card.classList.add("hideCard");
                card.classList.remove("reverted");
            });
        } else {
            // Non-matching cards
            setTimeout(function () {
                revertedCards.forEach(function (card) {
                    card.classList.remove("reverted");
                    card.classList.remove("toggleCard");
                });
            }, 700)
        }
    }

}


// Restart 
function restart() {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    cardData.forEach(function (item, index) {
        cards[index].classList.remove("toggleCard", "hideCard", "reverted");

        // Set randomize function
        faces[index].src = item.imgSrc;


        cards[index].setAttribute("name", item.name);


        // Hide the win message
        win.style.display = "none";

        // Hide the time message
        timeOut.style.display = "none";

        // Stop the ongoing timer
        clearTimeout(timer);

    });

    remainingTime = timeCount;
    startTimer();
}


// Start the time
function startTimer() {
    timer = setInterval(function () {
        remainingTime--;

        timeIndicator.textContent = remainingTime;

        if (0 >= remainingTime) {
            clearInterval(timer);
            timeOut.style.display = "block";
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
timeOutBtn.addEventListener("click", restart);
timeOutBtn.addEventListener("click", showCards);
winBtn.addEventListener("click", restart);

startTimer();
cardGenerator();