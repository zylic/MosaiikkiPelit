import { updateLanguage, updateTexts, texts } from "./js/language.js";
import { initEvents } from "./js/events.js";
import { questions } from "./js/question.js";

let gameImage;

const ttsGame = document.getElementById('ttsButtonGame');
const ttsFact = document.getElementById('ttsButtonFact');

document.addEventListener('DOMContentLoaded', function () {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = function() {
            const voices = window.speechSynthesis.getVoices();
            const finnishVoice = voices.find(voice => voice.lang === 'fi-FI');
            const englishVoice = voices.find(voice => voice.lang === 'en-US');
            if (finnishVoice && englishVoice) {
                window.speechSynthesis.finnishVoice = finnishVoice;
                window.speechSynthesis.englishVoice = englishVoice;
            }

            if (window.speechSynthesis.finnishVoice && window.speechSynthesis.englishVoice) {
                ttsGame.style.display = 'block';
                ttsFact.style.display = 'block';
            } else {
                console.error('No Finnish and/or English voice found');
            }
        }
    }

    gameImage = document.getElementById('game-screen-image-container');

    initEvents();

    Promise.all([
        fetch('./data/questions.json').then(response => response.json()),
        fetch('./data/texts.json').then(response => response.json())
    ])
    .then(([questionsData, textsData]) => {
        Object.assign(questions, questionsData);
        Object.assign(texts, textsData);
        
        updateLanguage("fin");
        updateTexts("default");
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});