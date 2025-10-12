// Timer state
let startTime = null;
let timerInterval = null;

// Get saved best time from sessionStorage
export function getBestTime() {
  const saved = sessionStorage.getItem('bestTime');
  return saved ? parseFloat(saved) : null;
}

// starts timer
export function startTimer(timerDisplay) {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    timerDisplay.textContent = `Time: ${elapsed.toFixed(2)}s`;
  }, 100);
}

// stops the timer and returns the time
export function stopTimer(timerDisplay) {
  clearInterval(timerInterval);
  const finalTime = (Date.now() - startTime) / 1000;
  timerDisplay.textContent = `Final Time: ${finalTime.toFixed(2)}s`;
  return finalTime;
}

// compares game times to pick which is the best time
export function saveBestTime(bestTimeDisplay, currentBest) {
  const currentTime = (Date.now() - startTime) / 1000;
  if (!currentBest || currentTime < currentBest) {
    sessionStorage.setItem('bestTime', currentTime);
    bestTimeDisplay.textContent = `Best Time: ${currentTime.toFixed(2)}s!`;
    return currentTime;
  }
  return currentBest;
}