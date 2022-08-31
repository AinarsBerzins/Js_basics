//Challenge 1: My Age in Days

function getAgeInDays() {
    var birthYear = prompt("Your birth year?");
    var ageInDays = (2022 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are' + ageInDays + ' days old.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    if (document.getElementById('ageInDays')) {
        document.getElementById('ageInDays').remove();
    }
    
}

function generateCat() {
    const image = document.createElement('img');
    const div = document.getElementById('flex-cat-gen');
    image.setAttribute('src', 'https://c.tenor.com/ZhfMGWrmCTcAAAAC/cute-kitty-best-kitty.gif');
    // image.setAttribute('src', 'static/images/cat.gif');
    image.setAttribute('height', 225);
    image.setAttribute('width', 150);
    image.onerror = function handleError() {
        console.log('image could not be loaded');
    }
    image.onload = function handleImageLoaded() {
        console.log('image loaded successfuly');
    }
    div.appendChild(image);
}

//Challenge 4: Change the Color of All Buttons
var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
    // if (buttonThingy.value ===  'red') {
    //     buttonsRed();
    // } else if (buttonThingy.value ===  'green') {
    //     buttonsGreen();
    // } else if (buttonThingy.value ===  'blue') {
    //     buttonsBlue();
    if (buttonThingy.value ===  'reset') {
        buttonColorReset();
    } else if (buttonThingy.value ===  'random') {
        randomColors();
    } else buttonColorChangePrimitive(buttonThingy);
}

// function buttonsRed() {
//     for (let i = 0; i < all_buttons.length; i++) {
//         all_buttons[i].classList.remove(all_buttons[i].classList[1]);
//         all_buttons[i].classList.add('btn-danger');
//     }
// }

// function buttonsGreen() {
//     for (let i = 0; i < all_buttons.length; i++) {
//         all_buttons[i].classList.remove(all_buttons[i].classList[1]);
//         all_buttons[i].classList.add('btn-success');
//     }
// }

// function buttonsBlue() {
//     for (let i = 0; i < all_buttons.length; i++) {
//         all_buttons[i].classList.remove(all_buttons[i].classList[1]);
//         all_buttons[i].classList.add('btn-primary');
//     }
// }

function buttonColorReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-warning', 'btn-danger', 'btn-success'];

    for(let i = 0; i < all_buttons.length; i++) {
        randomNum = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNum]);
    }
}

function buttonColorChangePrimitive(buttonThingy) {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(getColorClass(buttonThingy.value));
    }
}

function getColorClass(color) {
    var colorTemplate = {
        'red': 'btn-danger',
        'green': 'btn-success',
        'blue': 'btn-primary',
        'yellow': 'btn-warning'
    }
    return colorTemplate[color];
}

// Challenge 5: Blackjack

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11] }
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
}
function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for (i = 0; i < yourImages.length; i++) {
        yourImages[i].remove();
    }
    for (i = 0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;
    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        // If adding 11 keeps me below 21, add 11. Otherwise, add 1.
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function dealerLogic() {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    console.log('āaaa');
}