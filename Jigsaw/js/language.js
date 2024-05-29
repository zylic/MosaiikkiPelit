import { fact } from "./game.js";

export let gameLanguage = "fin";
export let texts = {};

const languageSelected = document.getElementById('start-screen-language-selected');

export function updateLanguage(language) {
    gameLanguage = language;

    for (let key in texts) {
        document.getElementById(key).textContent = texts[key][gameLanguage];
    }

    languageSelected.classList.add('rotate');

    updateTextPositions();

    setTimeout(() => {
        languageSelected.classList.remove('rotate');
    }, 500);

    updateFact();
}

function updateTextPositions() {
    if (gameLanguage === "fin") {
        languageSelected.style.top = "36.9%";
    } 
    else {
        languageSelected.style.top = "46.5%";
    }
}

export function updateFact() {
    document.getElementById('game-screen-fact-text').textContent = fact[gameLanguage];
}