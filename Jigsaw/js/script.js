import { initEvents } from './events.js';
import { texts, updateLanguage } from './language.js';
import { preloadImages } from './loading.js';
import { gameData } from './image.js';

const loadingScreen = document.getElementById('loadingScreen');

document.addEventListener('DOMContentLoaded', function() {
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
                console.log('Voices loaded');
            } else {
                console.error('No Finnish and/or English voice found');
            }
        }
    }

    initEvents();
    loadingScreen.style.display = 'block';
    preloadImages();

    fetch('./data/language.json')
        .then(response => response.json())
        .then(data => {
            Object.assign(texts, data);
            updateLanguage("fin");
        });

    fetch('./data/game.json')
        .then(response => response.json())
        .then(data => {
            Object.assign(gameData, data);
        });
});