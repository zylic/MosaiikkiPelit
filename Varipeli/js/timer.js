const gameTimerDisplay = document.getElementById('gameTimer');
const factTimerDisplay = document.getElementById('factTimer');
const endTimerDisplay = document.getElementById('endTimer');
const motiveTimerDisplay = document.getElementById('motiveTimer');
let startTime; // Declare startTime variable globally
let timerInterval = 0;

// Function to update the timer display
function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);

    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

    gameTimerDisplay.textContent = displayMinutes + ':' + displaySeconds;
    factTimerDisplay.textContent = displayMinutes + ':' + displaySeconds;
    endTimerDisplay.textContent = displayMinutes + ':' + displaySeconds;
    motiveTimerDisplay.textContent = displayMinutes + ':' + displaySeconds;
}

export function startTimer() {
    startTime = Date.now();

    timerInterval = setInterval(() => {
        updateTimer();
    }, 1000); // 1000 ms
}

export function resetTimer() {
    clearInterval(timerInterval);

    gameTimerDisplay.textContent = '00:00';
    factTimerDisplay.textContent = '00:00';
    endTimerDisplay.textContent = '00:00';
    motiveTimerDisplay.textContent = '00:00';
}

export function stopTimer() {
    clearInterval(timerInterval);
}