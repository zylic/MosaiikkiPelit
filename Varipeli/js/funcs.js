const screens = document.querySelectorAll('.screen');
const loadingScreen = document.getElementById('loadingScreen');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const factScreen = document.getElementById('factScreen');
const endGameScreen = document.getElementById('endGameScreen');
const pregameScreen = document.getElementById('pregameScreen');

export let loadedImages = {};

export function hideAllScreens() { // Hides all screens in the game container
    screens.forEach(screen => {
        screen.style.display = 'none';
    });
}

function preloadImages() { // ADD IMAGES TO THIS LIST IF YOU ARE PLANNING ON ADDING MORE COLORS. IF THE COLOR ISNT ADDED HERE THE GAME WILL NOT WORK.
    const images = ['imgs/colors/Yellow.jpg', 'imgs/colors/Yellow2.jpg', 'imgs/colors/Black.jpg', 'imgs/colors/Orange.jpg', 
                    'imgs/colors/Red.jpg', 'imgs/colors/Red2.jpg', 'imgs/colors/Brown.jpg', 'imgs/colors/Brown2.jpg', 'imgs/colors/Brown3.jpg',
                    'imgs/colors/Blue.jpg', 'imgs/colors/White.jpg', 'imgs/colors/White2.jpg', 'imgs/colors/Green.jpg', 'imgs/colors/Purple.jpg',
                    'imgs/colors/Blue2.jpg', 'imgs/colors/Brown4.jpg', 'imgs/colors/Brown5.jpg', 'imgs/colors/Brown6.jpg', 'imgs/colors/Pink.jpg', 
                    'imgs/colors/Red3.jpg', 'imgs/colors/Red4.jpg', 'imgs/colors/Silver.jpg', 'imgs/colors/White3.jpg', 'imgs/colors/White4.jpg', 
                    'imgs/colors/White5.jpg', 'imgs/colors/White7.jpg', 'imgs/colors/Yellow3.jpg', 'imgs/colors/White6.jpg', 'imgs/colors/Red5.jpg', 
                    'imgs/colors/Brown7.jpg', 'imgs/colors/Brown8.jpg', 'imgs/colors/Blue4.jpg', 'imgs/colors/Blue3.jpg', 'imgs/colors/Blue5.jpg',
                    'imgs/colors/Brown9.jpg',


                    'imgs/icons/exitButton.png', 'imgs/icons/exitButtonHover.png', 'imgs/icons/infoButton.png', 'imgs/icons/infoButtonHover.png',
                    'imgs/icons/lightbulbQuestion.png', 'imgs/icons/lightbulbQuestionYellow.png', 'imgs/icons/pointer.png',

                    'imgs/screens/EndScreen.jpg', 'imgs/screens/FactScreen.jpg', 'imgs/screens/GameScreen.jpg', 'imgs/screens/GameInstructionsScreen.jpg', 'imgs/screens/StartScreen.jpg',
                ]; // List of images
    let loadedImgsCount = 0;

    images.forEach(imageUrl => {
        const img = new Image();
        img.onload = () => {
            loadedImgsCount++;
            const progress = Math.round((loadedImgsCount / images.length) * 100);
            updateLoadingProgress(progress);

            loadedImages[imageUrl] = img;

            if (loadedImgsCount === images.length) {
                // All images loaded
                loadingText.textContent = '100%!';
                setTimeout(() => {
                    hideAllScreens();
                    startScreen.style.display = 'block'; // Transition to main game
                }, 2000);
            }
        };
        img.src = imageUrl;
    });
}

function updateLoadingProgress(progress) {
    loadingText.textContent = `${progress}%`
}

function init() {
    hideAllScreens();
    loadingScreen.style.display = 'block';
    preloadImages();
}

window.addEventListener('load', init);