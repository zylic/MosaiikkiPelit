import { updateLanguage, gameLanguage } from "./language.js";
import { startJigsaw } from "./game.js";
import { stopTimer, getElapsedTime } from "./timer.js";

const pages = document.querySelectorAll('.page');

const pageInfoScreen = document.getElementById('page-info-screen');
const pageGameScreen = document.getElementById('page-game-screen');
const pageGameInfoScreen = document.getElementById('page-game-info-screen');
const pageStartScreen = document.getElementById('page-start-screen');
const pageGameChoiceScreen = document.getElementById('page-game-choice-screen');
const pageGameDifficultyScreen = document.getElementById('page-game-difficulty-screen');
const pageMotiveScreen = document.getElementById('page-motive-screen');
const pageEndScreen = document.getElementById('page-end-screen');
const pageGameScreenHelpButton = document.getElementById('game-screen-help-button');

let category = '';

export function hideAllPages() {
    pages.forEach(page => {
        page.style.display = 'none';
    });
}

export function initEvents() {

    // Start screen buttons

    document.getElementById('start-screen-start-button').addEventListener('click', function () {
        hideAllPages();
        pageInfoScreen.style.display = 'block';
    });

    document.getElementById('start-screen-finnish-button').addEventListener('click', function () {
        updateLanguage('fin');
    });

    document.getElementById('start-screen-english-button').addEventListener('click', function () {
        updateLanguage('eng');
    });

    document.getElementById('start-screen-motive-button').addEventListener('click', function () {
        pageMotiveScreen.style.display = 'block';
    });


    // Info screen buttons

    document.getElementById('info-screen-start-button').addEventListener('click', function () {
        hideAllPages();
        pageGameChoiceScreen.style.display = 'block';
    });

    document.getElementById('info-screen-finnish-button').addEventListener('click', function () {
        updateLanguage('fin');
    });

    document.getElementById('info-screen-english-button').addEventListener('click', function () {
        updateLanguage('eng');
    });

    document.getElementById('info-screen-exit-button').addEventListener('click', function () {
        hideAllPages();
        pageStartScreen.style.display = 'block';
    });

    // Game Choice buttons

    document.getElementById('game-choice-finnish-button').addEventListener('click', function () {
        updateLanguage('fin');
    });

    document.getElementById('game-choice-english-button').addEventListener('click', function () {
        updateLanguage('eng');
    });

    document.getElementById('game-choice-exit-button').addEventListener('click', function () {
        hideAllPages();
        pageStartScreen.style.display = 'block';
    });

    document.getElementById('castle-game-button').addEventListener('click', function () {
        category = 'castle';
        hideAllPages();
        pageGameDifficultyScreen.style.display = 'block';
    });

    document.getElementById('arms-game-button').addEventListener('click', function () {
        category = 'arms';
        hideAllPages();
        pageGameDifficultyScreen.style.display = 'block';
    });

    document.getElementById('random-game-button').addEventListener('click', function () {
        category = 'random';
        hideAllPages();
        pageGameDifficultyScreen.style.display = 'block';
    });

    // Game difficulty buttons

    document.getElementById('game-difficulty-finnish-button').addEventListener('click', function () {
        updateLanguage('fin');
    });

    document.getElementById('game-difficulty-english-button').addEventListener('click', function () {
        updateLanguage('eng');
    });

    document.getElementById('game-difficulty-exit-button').addEventListener('click', function () {
        hideAllPages();
        pageStartScreen.style.display = 'block';
    });

    document.getElementById('easy-game-button').addEventListener('click', function () {
        hideAllPages();
        pageGameScreen.style.display = 'block';
        pageGameScreenHelpButton.style.display = 'none';
        startJigsaw(category, 9);
    });

    document.getElementById('medium-game-button').addEventListener('click', function () {
        hideAllPages();
        pageGameScreen.style.display = 'block';
        pageGameScreenHelpButton.style.display = 'none';
        startJigsaw(category, 16);
    });

    document.getElementById('hard-game-button').addEventListener('click', function () {
        hideAllPages();
        pageGameScreen.style.display = 'block';
        pageGameScreenHelpButton.style.display = 'block';
        startJigsaw(category, 25);
    });

    document.getElementById('impossible-game-button').addEventListener('click', function () {
        hideAllPages();
        pageGameScreen.style.display = 'block';
        pageGameScreenHelpButton.style.display = 'block';
        startJigsaw(category, 36);
    });

    document.getElementById('game-difficulty-back-button').addEventListener('click', function () {
        hideAllPages();
        pageGameChoiceScreen.style.display = 'block';
    });

    // Game screen buttons

    document.getElementById('game-screen-finnish-button').addEventListener('click', function () {
        updateLanguage('fin');
    });

    document.getElementById('game-screen-english-button').addEventListener('click', function () {
        updateLanguage('eng');
    });

    document.getElementById('game-screen-info-button').addEventListener('click', function () {
        hideAllPages();

        let hintLines = document.querySelectorAll('[id^="hint-line"]');
        hintLines.forEach(hintLine => {
            hintLine.style.display = 'none';
        });

        pageGameInfoScreen.style.display = 'block';
    });

    document.getElementById('game-screen-help-button').addEventListener('click', function () {
        document.getElementById('game-screen-help-modal').style.display = 'block';
    });

    document.getElementById('game-screen-help-modal-close-button').addEventListener('click', function () {
        document.getElementById('game-screen-help-modal').style.display = 'none';
    });

    document.getElementById('game-screen-exit-button').addEventListener('click', function () {
        stopTimer();
        document.getElementById('timer').style.display = 'none';
        hideAllPages();

        let hintLines = document.querySelectorAll('[id^="hint-line"]');
        hintLines.forEach(hintLine => {
            hintLine.remove();
        });

        pageStartScreen.style.display = 'block';
    });

    document.getElementById('game-screen-winner-modal-restart-button').addEventListener('click', function () {
        document.getElementById('game-screen-image-container').innerHTML = '';
        document.getElementById('game-screen-piece-container').innerHTML = '';
        document.getElementById('game-screen-winner-modal').style.display = 'none';
        document.getElementById('timer').style.display = 'none';
        hideAllPages();
        pageGameChoiceScreen.style.display = 'block';
    });

    document.getElementById('game-screen-winner-modal-end-button').addEventListener('click', function() {
        stopTimer();
        const elapsedTime = getElapsedTime();
        console.log(elapsedTime);
        document.getElementById('end-screen-timer').textContent = `${elapsedTime}`;
        hideAllPages();
        pageEndScreen.style.display = 'block';
        document.getElementById('timer').style.display = 'none';
    })

    // Ingame info screen buttons

    document.getElementById('game-info-start-button').addEventListener('click', function () {
        hideAllPages();

        let hintLines = document.querySelectorAll('[id^="hint-line"]');
        

        pageGameScreen.style.display = 'block';
    });

    document.getElementById('game-info-finnish-button').addEventListener('click', function () {
        updateLanguage('fin');
    });

    document.getElementById('game-info-english-button').addEventListener('click', function () {
        updateLanguage('eng');
    });

    document.getElementById('game-info-exit-button').addEventListener('click', function () {
        hideAllPages();
        pageStartScreen.style.display = 'block';
    });


    // Motive screen buttons

    document.getElementById('motive-screen-start-button').addEventListener('click', function () {
        pageMotiveScreen.style.display = 'none';
    });

    document.getElementById('motive-screen-finnish-button').addEventListener('click', function () {
        updateLanguage('fin');
    });

    document.getElementById('motive-screen-english-button').addEventListener('click', function () {
        updateLanguage('eng');
    });

    // End screen buttons

    document.getElementById('end-screen-finnish-button').addEventListener('click', function () {
        updateLanguage('fin');
    });

    document.getElementById('end-screen-english-button').addEventListener('click', function () {
        updateLanguage('eng');
    });

    document.getElementById('end-screen-exit-button').addEventListener('click', function () {
        hideAllPages();
        pageStartScreen.style.display = 'block';
    });

    document.getElementById('end-screen-restart-button').addEventListener('click', function() {
        hideAllPages();
        pageStartScreen.style.display = 'block';
    })

    document.getElementById('game-screen-tts-button').addEventListener('click', function () {
        let text = document.getElementById('game-screen-fact-text').textContent;

        let utterance = new SpeechSynthesisUtterance(text);

        if (gameLanguage === 'fin') {
            utterance.lang = 'fi-FI';
        }
        else if (gameLanguage === 'eng') {
            utterance.lang = 'en-US';
        }

        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 0.5;

        speechSynthesis.speak(utterance);

        if (speechSynthesis.speaking) {
            document.addEventListener('keydown', () => {
                speechSynthesis.cancel();
            });

            document.addEventListener('mousedown', () => {
                speechSynthesis.cancel();
            });
        }
    });
}