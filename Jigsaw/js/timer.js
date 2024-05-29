let time = 0;
let timerId = null;

export function startTimer() {
    timerId = setInterval(() => 
    {
        time++;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

export function stopTimer() {
    clearInterval(timerId);
}

export function resetTimer() {
    time = 0;
    timerId = null;
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
}

export function getElapsedTime() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}m ${seconds}s`;
}