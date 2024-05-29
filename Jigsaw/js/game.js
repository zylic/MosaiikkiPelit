import { getImage, gameData } from "./image.js";
import { startTimer, stopTimer, resetTimer } from "./timer.js";
import { gameLanguage } from "./language.js";

const gameImage = document.getElementById('game-screen-image-container');
const pieceContainer = document.getElementById('game-screen-piece-container');
const winnerModal = document.getElementById('game-screen-winner-modal');
const factGameImage = document.getElementById('game-screen-fact-image');
const gameScreenHelpModalImage = document.getElementById('game-screen-help-modal-image');

let pieceCount = 0;
let draggedPiece = null;
let dragOffset = { x: 0, y: 0 };

export let fact = {
    'fin': '',
    'eng': ''
};

let usedCastleQuestions = []; // Track used castle questions
let usedArmsQuestions = [];   // Track used arms questions
let usedRandomQuestions = []; // Track used random questions

export function startJigsaw(categoryName, pieceCount) {
    document.getElementById('game-screen-hint-button').classList.add('disabled');
    winnerModal.style.display = 'none';
    gameImage.innerHTML = '';
    pieceContainer.innerHTML = '';

    gameImage.style.zIndex = 1;
    pieceContainer.style.zIndex = 0;

    setRandomImage(categoryName);
    gameImage.style.display = 'block';

    makePieces(pieceCount);

    document.getElementById('game-screen-hint-button').addEventListener('click', showHint);
    
    document.getElementById('timer').style.display = 'block';
    resetTimer();
    startTimer();

    console.log(fact)
    document.getElementById('game-screen-fact-text').textContent = fact[gameLanguage];
}

function setRandomImage(category){
    let data;
    switch(category) {
        case 'castle':
            data = getRandomImageWithNoDuplicates('castle', usedCastleQuestions);
            break;
        case 'arms':
            data = getRandomImageWithNoDuplicates('arms', usedArmsQuestions);
            break;
        case 'random':
            data = getRandomImageWithNoDuplicates('random', usedRandomQuestions);
            break;
    }
    
    fact['fin'] = data.fact['fin'];
    fact['eng'] = data.fact['eng'];
    gameImage.style.backgroundImage = `url(${data.url})`;
    factGameImage.style.backgroundImage = gameImage.style.backgroundImage;
    gameScreenHelpModalImage.style.backgroundImage = gameImage.style.backgroundImage;
}

function getRandomImageWithNoDuplicates(category, usedQuestions) {
    let data;
    do {
        data = getImage(category);
    } while (usedQuestions.includes(data)); // Keep generating until you find an unused question

    usedQuestions.push(data); // Mark the question as used
    if (usedQuestions.length === Object.keys(gameData.Linnat).length) {
        // If all questions have been used, reset the used questions list
        resetUsedQuestions(category);
    }
    
    return data;
}

function resetUsedQuestions(category) {
    switch(category) {
        case 'castle':
            usedCastleQuestions = [];
            break;
        case 'arms':
            usedArmsQuestions = [];
            break;
        case 'random':
            usedRandomQuestions = [];
            break;
    }
}

function makePieces(piece_count) {
    pieceContainer.innerHTML = '';
    pieceCount = piece_count;
    const pieceSize = Math.sqrt(pieceCount);
    const imagePath = gameImage.style.backgroundImage.slice(5, -2);

    for (let i = 0; i < pieceCount; i++) {
        const piece = createPiece(i, pieceSize, imagePath);
        gameImage.appendChild(piece);
    }

    gameImage.style.backgroundImage = 'none';
}

function createPiece(i, pieceSize, imagePath) {
    const piece = document.createElement('div');
    piece.classList.add('jigsaw-piece');
    piece.setAttribute('draggable', 'false');
    piece.id = `piece-${i}`;

    const x = (i % pieceSize) * 100;
    const y = Math.floor(i / pieceSize) * 100;

    piece.style.backgroundImage = `url(${imagePath})`;
    piece.style.backgroundPosition = `-${x}% -${y}%`;
    piece.style.backgroundSize = `${pieceSize * 100}%`;
    piece.style.width = `${gameImage.offsetWidth / pieceSize}px`;
    piece.style.height = `${gameImage.offsetHeight / pieceSize}px`;
    piece.style.boxSizing = 'border-box';
    piece.style.position = 'absolute';
    piece.style.left = `${(i % pieceSize) * gameImage.offsetWidth / pieceSize}px`;
    piece.style.top = `${Math.floor(i / pieceSize) * gameImage.offsetHeight / pieceSize}px`;
    piece.classList.add('disabled');

    setTimeout(() => movePieceToRandomLocation(piece), 1500);

    piece.addEventListener('mouseover', mouseOver);
    piece.addEventListener('mouseout', mouseOut);
    piece.addEventListener('mousedown', mouseDown);

    return piece;
}

function movePieceToRandomLocation(piece) {
    pieceContainer.appendChild(piece);
    
    const pieceContainerRect = pieceContainer.getBoundingClientRect();
    const pieceRect = piece.getBoundingClientRect();

    const randomX = Math.random() * (pieceContainerRect.width - pieceRect.width);
    const randomY = Math.random() * (pieceContainerRect.height - pieceRect.height);

    piece.style.left = `${randomX}px`;
    piece.style.top = `${randomY}px`;

    pieceContainer.style.zIndex = 1;
    gameImage.style.zIndex = 0;

    piece.classList.remove('disabled');
    document.getElementById('game-screen-hint-button').classList.remove('disabled');
}

function mouseOver(e) {
    if (!e.target.classList.contains('jigsaw-in-correct-position') && e.target.style.border !== '2px solid yellow') {
        e.target.style.border = '2px solid red';
    }
}

function mouseOut(e) {
    if (!e.target.classList.contains('jigsaw-in-correct-position') && e.target.style.border !== '2px solid yellow') {
        e.target.style.border = '1px solid black';
    }
}

function mouseDown(e) {
    if (!e.target.classList.contains('hinted-piece')) {
        const hintLine = document.getElementById('hint-line');
        const hintSquare = document.getElementById('hint-square');

        if (hintLine) {
            hintLine.remove();
        }

        if (hintSquare) {
            hintSquare.remove();
        }

        const hintedPiece = document.querySelector('.hinted-piece');
        if (hintedPiece) {
            hintedPiece.classList.remove('hinted-piece');
            hintedPiece.style.border = '1px solid black';
        }

        document.getElementById('game-screen-hint-button').classList.remove('disabled');
    }

    if (!e.target.classList.contains('jigsaw-in-correct-position')) {
        draggedPiece = e.target;
        draggedPiece.style.zIndex = 1000;
        dragOffset.x = e.clientX - draggedPiece.getBoundingClientRect().left;
        dragOffset.y = e.clientY - draggedPiece.getBoundingClientRect().top;

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }
}

function mouseMove(e) {
    if (draggedPiece) {
        const pieceContainerRect = pieceContainer.getBoundingClientRect();
        draggedPiece.style.left = `${e.clientX - dragOffset.x - pieceContainerRect.left}px`;
        draggedPiece.style.top = `${e.clientY - dragOffset.y - pieceContainerRect.top}px`;
    }
}

function mouseUp(e) {
    const hintLine = document.getElementById('hint-line');
    const hintSquare = document.getElementById('hint-square');

    const pieces = document.querySelectorAll('.jigsaw-piece');
    pieces.forEach(piece => {

        if (piece.classList.contains('jigsaw-in-correct-position')) return;

        piece.style.zIndex = 1;
    });
    if (draggedPiece) {
        
        if (hintLine && hintSquare) {
            draggedPiece.style.zIndex = 1000;
        }
        else {
            draggedPiece.style.zIndex = 2;
        }
        const pieceIndex = parseInt(draggedPiece.id.replace('piece-', ''));
        const pieceSize = Math.sqrt(pieceCount);

        const pieceWidth = gameImage.offsetWidth / pieceSize;
        const pieceHeight = gameImage.offsetHeight / pieceSize;

        const gameImageRect = gameImage.getBoundingClientRect();
        const pieceContainerRect = pieceContainer.getBoundingClientRect();

        const correctX = (pieceIndex % pieceSize) * pieceWidth + gameImageRect.left - pieceContainerRect.left;
        const correctY = Math.floor(pieceIndex / pieceSize) * pieceHeight + gameImageRect.top - pieceContainerRect.top;

        const currentX = parseFloat(draggedPiece.style.left);
        const currentY = parseFloat(draggedPiece.style.top);

        const distance = Math.sqrt(Math.pow(currentX - correctX, 2) + Math.pow(currentY - correctY, 2));

        if (distance < 20) {
            draggedPiece.style.zIndex = 0;
            draggedPiece.style.left = `${correctX}px`;
            draggedPiece.style.top = `${correctY}px`;
            draggedPiece.style.border = 'none';
            draggedPiece.classList.add('jigsaw-in-correct-position');

            if (hintSquare) {
                hintSquare.remove();
            }

            if (hintLine) {
                hintLine.remove();
            }

            document.getElementById('game-screen-hint-button').classList.remove('disabled');

            const pieces = document.querySelectorAll('.jigsaw-piece');
            const piecesInCorrectPosition = document.querySelectorAll('.jigsaw-in-correct-position');
            if (pieces.length === piecesInCorrectPosition.length) {
                console.log('All pieces in correct position!');
                console.log('You win!');
                stopTimer();

                winnerModal.style.display = 'block';
                startConfetti();

                // remove all event listeners
                pieces.forEach(piece => {
                    piece.removeEventListener('mouseover', mouseOver);
                    piece.removeEventListener('mouseout', mouseOut);
                    piece.removeEventListener('mousedown', mouseDown);
                });
            }
        }
    }

    draggedPiece = null;
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
}

function startConfetti() {
    var end = Date.now() + (1.25 * 1000);
    var colors = ['#0e1df0', '#0e7ff0', '#03bcff', '#ffffff', '#004761'];

    (function frame() {
    confetti({
        particleCount: 5,
        angle: 60,
        spread: 100,
        origin: { x: 0.25, y: 0.4 },
        colors: colors
    });
    confetti({
        particleCount: 5,
        angle: 120,
        spread: 100,
        origin: { x: 0.75, y: 0.4 },
        colors: colors
    });

    if (Date.now() < end) {
        requestAnimationFrame(frame);
    }
}());
}

function showHint() {
    document.getElementById('game-screen-hint-button').classList.add('disabled');
    let closestPiece = getClosestPiece();

    const pieceSize = Math.sqrt(pieceCount);
    const pieceWidth = gameImage.offsetWidth / pieceSize;
    const pieceHeight = gameImage.offsetHeight / pieceSize;

    const gameImageRect = gameImage.getBoundingClientRect();
    const pieceContainerRect = pieceContainer.getBoundingClientRect();
    
    if (closestPiece) {
        closestPiece.style.border = '2px solid yellow';
        closestPiece.style.zIndex = 1000;

        const pieceIndex = parseInt(closestPiece.id.replace('piece-', ''));
        const correctX = (pieceIndex % pieceSize) * pieceWidth + gameImageRect.left - pieceContainerRect.left;
        const correctY = Math.floor(pieceIndex / pieceSize) * pieceHeight + gameImageRect.top - pieceContainerRect.top;
        const originalX = closestPiece.style.left;
        const originalY = closestPiece.style.top;

        const square = document.createElement('div');
        square.id = 'hint-square';
        square.style.position = 'absolute';
        square.style.left = `${correctX}px`;
        square.style.top = `${correctY}px`;
        square.style.width = `${pieceWidth}px`;
        square.style.height = `${pieceHeight}px`;
        square.style.border = '2px solid yellow';
        pieceContainer.appendChild(square);


        let svg = document.getElementById('lines');

        let middleOfPiece = {
            x: parseFloat(originalX) + pieceWidth / 2,
            y: parseFloat(originalY) + pieceHeight / 2
        };

        let middleOfSquare = {
            x: correctX + pieceWidth / 2,
            y: correctY + pieceHeight / 2
        };

        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('id', 'hint-line');
        line.setAttribute('x1', middleOfPiece.x);
        line.setAttribute('y1', middleOfPiece.y);
        line.setAttribute('x2', middleOfSquare.x);
        line.setAttribute('y2', middleOfSquare.y);
        line.setAttribute('stroke', 'yellow');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('stroke-dasharray', '10,10');
        line.setAttribute('stroke-dashoffset', '1000');
        line.style.animation = 'dash 15s linear forwards infinite';
        line.setAttribute('z-index', '999')
        line.setAttribute('marker-end', 'url(#arrow-head)');
        svg.appendChild(line);

        closestPiece.addEventListener('mousemove', (e) => {
            middleOfPiece = {
                x: parseFloat(closestPiece.style.left) + pieceWidth / 2,
                y: parseFloat(closestPiece.style.top) + pieceHeight / 2
            };

            line.setAttribute('x1', middleOfPiece.x);
            line.setAttribute('y1', middleOfPiece.y);
        });
    }
}

function getClosestPiece(){
    const pieces = document.querySelectorAll('.jigsaw-piece');
    const piecesNotInCorrectPosition = Array.from(pieces).filter(piece => !piece.classList.contains('jigsaw-in-correct-position'));

    const pieceSize = Math.sqrt(pieceCount);
    const pieceWidth = gameImage.offsetWidth / pieceSize;
    const pieceHeight = gameImage.offsetHeight / pieceSize;

    const gameImageRect = gameImage.getBoundingClientRect();
    const pieceContainerRect = pieceContainer.getBoundingClientRect();

    let smallestDistance = Infinity;
    let closestPiece = null;

    piecesNotInCorrectPosition.forEach(piece => {
        const pieceIndex = parseInt(piece.id.replace('piece-', ''));
        const correctX = (pieceIndex % pieceSize) * pieceWidth + gameImageRect.left - pieceContainerRect.left;
        const correctY = Math.floor(pieceIndex / pieceSize) * pieceHeight + gameImageRect.top - pieceContainerRect.top;
        const currentX = parseFloat(piece.style.left);
        const currentY = parseFloat(piece.style.top);
        const distance = Math.sqrt(Math.pow(currentX - correctX, 2) + Math.pow(currentY - correctY, 2));

        if (distance < smallestDistance) {
            smallestDistance = distance;
            closestPiece = piece;
        }
    });

    closestPiece.classList.add('hinted-piece');

    return closestPiece;
}