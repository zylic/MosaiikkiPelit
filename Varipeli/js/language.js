export let gameLanguage = "fin";
export let texts = {};

export function updateTexts(language) {
    const chosenText = document.getElementById('chosenText');
    const finnishButton = document.getElementById('finButton');
    const languagesText = document.getElementById('startLanguagesText');

    switch (language) {
        case "fin":
            chosenText.style.top = "36%";
            finnishButton.style.left = "8.3%";
            languagesText.style.left = "7.5%";
            break;
        case "eng":
            chosenText.style.top = "47%";
            finnishButton.style.left = "7.5%";
            languagesText.style.left = "1%";
            break;
        default:
            chosenText.style.top = "36%";
            finnishButton.style.left = "8.3%";
            break;
    }
}

// Updates language of the game
export function updateLanguage(language) {
    const buttons = document.querySelectorAll('.button');
    const options = document.querySelectorAll('.option');
    const buttonTexts = texts.Buttons[0];
    const textElements = texts.Texts[0];

    gameLanguage = language;

    buttons.forEach(button => {
        const buttonId = button.id;
        if (buttonTexts.hasOwnProperty(buttonId)) {
            button.textContent = buttonTexts[buttonId][gameLanguage];
        }
    });

    for (const textElementId in textElements) {
        if (textElements.hasOwnProperty(textElementId)) {
            const element = document.getElementById(textElementId);
            if (element) {
                element.textContent = textElements[textElementId][gameLanguage];
            }
        }
    }
}