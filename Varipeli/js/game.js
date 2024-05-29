import { hideAllScreens, loadedImages } from "./funcs.js";
import { getQuestion, resetQuestions, usedQuestions, nextQuestions } from "./question.js";
import { stopTimer, resetTimer, startTimer } from "./timer.js";

const gameImage = document.getElementById('gameImage');
const optionContainer = document.getElementById('options');
const factScreen = document.getElementById('factScreen');
const scoreText = document.getElementById('gameScore');
const buttons = document.querySelectorAll('.button');
const factGameImage = document.getElementById('factGameImage');
const gameScreen = document.getElementById('gameScreen');
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const helpButton = document.getElementById("helpButtonGame");

export let question;
let fact = '';
let scoreCorrect = 0; // Questions answered correctly 
export let scoreTotal = 0; // Amount of questions
let timeoutActive = false; // Track timeout state
let loadingQuestion = false;

export function loadQuestion(questionToUse = null, disabled = false) {
    if (loadingQuestion) {
        return;
    }

    loadingQuestion = true;

    optionContainer.innerHTML = ''; // Clear options from previous question

    if (questionToUse === null) {
        question = getQuestion();
    }
    else {
        question = questionToUse;
    }

    setElements(question);

    if (disabled) {
        createOptions(question, true);
    }
    else{
        createOptions(question);
    }

    document.getElementById('helpButtonGame').addEventListener('click', () => { // Add event listener to help button
        let correctOption = question.answer;
        let optionElements = document.querySelectorAll('.option');


        optionElements.forEach(optionElement => {
            if (optionElement.textContent === correctOption) {
                optionElement.style.backgroundColor = 'rgb(255, 255, 140)';
            }
        });
    });

    loadingQuestion = false;
}

function eventHandler(selectedOption, correctOption) { // Handle option click
    if (timeoutActive) {
        return;
    }

    const optionElements = document.querySelectorAll('.option'); // Select all option elements

    optionElements.forEach(optionElement => {
        if (optionElement.textContent === selectedOption) { // Check if selected option is correct
            if (selectedOption === correctOption) {
                optionElement.style.backgroundColor = 'rgb(119, 255, 119)';
                scoreTotal++;
                scoreCorrect++;
            } else {
                optionElement.style.backgroundColor = 'rgb(255, 119, 119)';
                scoreTotal++;

                // Show correct option after selecting the wrong answer
                optionElements.forEach(optionElement => {
                    if (optionElement.textContent === correctOption) {
                        optionElement.style.backgroundColor = 'rgb(119, 255, 119)';
                    }
                });
            }
        }
    });

    // Disable all buttons
    buttons.forEach(buttonElement => {
        buttonElement.classList.add('disabled');
    });

    // Disable Option buttons
    optionElements.forEach(optionElement => {
        optionElement.classList.add('disabled');
    });

    setTimeout(() => { // Set timeout for 2 seconds
        if (selectedOption === correctOption) {

            // Enable all buttons
            buttons.forEach(buttonElement => {
                buttonElement.classList.remove('disabled');
            });

            // Enable Option buttons
            optionElements.forEach(optionElement => {
                optionElement.classList.remove('disabled');
            });


            hideAllScreens();
            showFact(fact);
        }
        if (selectedOption !== correctOption) {
            if (scoreTotal >= 5) {
                hideAllScreens();
                showEndGame();
            } else {
                loadQuestion()
                    hideAllScreens();
                    gameScreen.style.display = 'block';
            }


            // Enable all buttons
            buttons.forEach(buttonElement => {
                buttonElement.classList.remove('disabled');
            });

            // Enable Option buttons
            optionElements.forEach(optionElement => {
                optionElement.classList.remove('disabled');
            });
        }
        timeoutActive = false; // Reset timeout flag
    }, 2000);

    timeoutActive = true; // Set timeout flag to true
    if (timeoutActive === false) {
        // Reset button states after timeout
        optionElements.forEach(optionElement => {
            optionElement.style.backgroundColor = '';
        });
    }

    question.userAnswer = selectedOption;

    usedQuestions.push(question);
}

function showFact(fact) { // Show fact screen
    const factText = document.getElementById('factText');
    factText.textContent = fact;
    factScreen.style.display = 'block';
    gameScreen.style.display = 'none';

    // Show game image
    factGameImage.style.backgroundImage = gameImage.style.backgroundImage;
}

export function showEndGame() { // Show end game screen
    stopTimer();
    const endGameScreen = document.getElementById('endGameScreen');
    const scoreText = document.getElementById('gameScoreEnd');
    const gameScreen = document.getElementById('gameScreen');

    gameScreen.style.display = 'none';
    endGameScreen.style.display = 'block';
    scoreText.textContent = `${scoreCorrect}/${scoreTotal}`;
}

function setElements(randomQuestion) { // Set elements
    // Set image, fact and score
    gameImage.style.backgroundImage = `url(${loadedImages[randomQuestion.question].src})`;

    fact = randomQuestion.fact;
    scoreText.textContent = `${scoreCorrect}/${scoreTotal}`;
}

function createOptions(randomQuestion, disabled = false) {
    randomQuestion.options.forEach((optionText, index) => { // Loop through options
        const optionElement = document.createElement('div');
        optionElement.textContent = optionText;
        optionElement.classList.add('option');
        helpButton.classList.remove('disabled');

        if (disabled) {
            optionElement.classList.add('disabled');
            helpButton.classList.add('disabled');
            
            if (randomQuestion.answer === randomQuestion.userAnswer) {
                if (optionText === randomQuestion.answer) {
                                    
                    optionElement.style.backgroundColor = 'rgb(119, 255, 119)';
                }
            }
            else {
                if (optionText === randomQuestion.userAnswer) {
                    optionElement.style.backgroundColor = 'rgb(255, 119, 119)';
                }
                if (optionText === randomQuestion.answer) {
                    optionElement.style.backgroundColor = 'rgb(119, 255, 119)';
                }
            }
        }

        optionElement.addEventListener('click', () => eventHandler(optionText, randomQuestion.answer));

        optionContainer.appendChild(optionElement); // Append the option to container
    });
}

export function updateOptionLanguage() {
    optionContainer.innerHTML = '';
    question = getQuestion(question);

    if (nextQuestions.length > 0) {
        createOptions(question, true);
    }
    else {
        createOptions(question);
    }
}

export function updateFactLanguage() {
    factText.innerHTML = '';

    fact = getQuestion(question).fact;
    factText.textContent = fact;
}

export function resetGame() { // Reset game
    resetTimer();
    scoreCorrect = 0;
    scoreTotal = 0;
    scoreText.textContent = `${scoreCorrect}/${scoreTotal}`;

    previousButton.style.display = "none";
    nextButton.style.display = "none";
}

export function resetQuestionsGame() {
    resetQuestions();
} 