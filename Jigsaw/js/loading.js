import { hideAllPages } from "./events.js";

export let loadedImages = {};

const pageStartScreen = document.getElementById('page-start-screen');

export function preloadImages() {
    const images = [
        'imgs/pages/Background.jpg',

        'imgs/icons/cursor.png', 'imgs/icons/pointer.png', 'imgs/icons/engButton.png', 'imgs/icons/englishFlag.jpg', 'imgs/icons/exitButton.png', 'imgs/icons/finButton.png', 
        'imgs/icons/finnishFlag.jpg', 'imgs/icons/infoButton.png', 'imgs/icons/motiveButton.png', 'imgs/icons/puzzlePieces.png', 
        'imgs/icons/arrowBackwards.png', 'imgs/icons/arrow.png', 

        'imgs/puzzle/Jyvaskylavaakuna.jpg', 'imgs/puzzle/Keuruuvaakuna.jpg', 'imgs/puzzle/Olavinlinna.jpg', 'imgs/puzzle/Raaseporinlinna.jpg', 'imgs/puzzle/Tamperevaakuna.jpg',
        'imgs/puzzle/Turunlinna.jpg',  'imgs/puzzle/Hameenlinna.jpg',  'imgs/puzzle/Bomarsundlinna.jpg',  'imgs/puzzle/Kastelholmlinna.jpg',  'imgs/puzzle/SibeliusMonumentti.jpg',
        'imgs/puzzle/AleksisKiviPatsas.jpg', 'imgs/puzzle/SuomenKansallisteatteri.jpg', 'imgs/puzzle/HelsinkiKatedraali.jpg', 'imgs/puzzle/VanhaKauppahalli.jpg', 'imgs/puzzle/HelsinkiKirkko.jpg',
        'imgs/puzzle/LappiNapapiiri.jpg',  'imgs/puzzle/Vantaavaakuna.jpg', 'imgs/puzzle/Turkuvaakuna.jpg', 'imgs/puzzle/Suomivaakuna.jpg', 'imgs/puzzle/Porvoovaakuna.jpg', 'imgs/puzzle/Ouluvaakuna.jpg', 
        'imgs/puzzle/Kuopiovaakuna.jpg', 'imgs/puzzle/Kalajokivaakuna.jpg', 'imgs/puzzle/Imatravaakuna.jpg', 'imgs/puzzle/Helsinkivaakuna.jpg', 

                ]; // List of images
    let loadedImgsCount = 0;

    images.forEach(imageUrl => {
        const img = new Image();
        img.onload = () => {
            console.log(img, "loaded")
            loadedImgsCount++;
            const progress = Math.round((loadedImgsCount / images.length) * 100);
            updateLoadingProgress(progress);

            loadedImages[imageUrl] = img;

            if (loadedImgsCount === images.length) {
                // All images loaded
                loadingText.textContent = '100%!';
                setTimeout(() => {
                    hideAllPages();
                    pageStartScreen.style.display = 'block';
                }, 2000);
            }
        };
        img.src = imageUrl;
    });
}

function updateLoadingProgress(progress) {
    loadingText.textContent = `${progress}%`
}