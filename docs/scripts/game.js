//easter egg hint
window.easterEgg = triggerEasterEgg;
console.log("Type 'easterEgg()' for a small surprise!");

//import of all the things needed from storage.js
import {
  startTimer,
  stopTimer,
  saveBestTime,
  getBestTime
} from './storage.js';

//changes the order of the houses
function shuffleHousesInGrid() {
  const container = document.querySelector('.deliveryHouses');
  if (!container) return;

  const houses = Array.from(container.querySelectorAll('.house'));
  if (houses.length === 0) return;

  const shuffled = houses.sort(() => Math.random() - 0.5);
  shuffled.forEach(house => container.appendChild(house));
}

//the logic for the game
let bestTime = null;

function setupGame() {
  const papers = document.querySelectorAll('.newspaper');
  const houses = document.querySelectorAll('.house');
  const timerDisplay = document.getElementById('timer');
  const bestTimeDisplay = document.getElementById('best-time');

  // Load best time from sessionStorage
  bestTime = getBestTime();
  if (bestTime) {
    bestTimeDisplay.textContent = `Best Time: ${bestTime.toFixed(2)}s`;
  }

  let gameStarted = false;

  papers.forEach(paper => {
    paper.setAttribute('draggable', 'true');

    // Start timer on first drag
    paper.addEventListener('dragstart', e => {
      if (!gameStarted) {
        startTimer(timerDisplay);
        gameStarted = true;
      }
      e.dataTransfer.setData('text/plain', paper.querySelector('.number').textContent.trim());
      paper.classList.add('dragging');
    });

    paper.addEventListener('dragend', () => {
      paper.classList.remove('dragging');
    });

    paper.addEventListener('click', () => {
      papers.forEach(p => p.classList.remove('selected'));
      paper.classList.add('selected');
    });
  });

  houses.forEach(house => {
    house.addEventListener('dragover', e => {
      e.preventDefault();
      house.classList.add('hovered');
    });

    house.addEventListener('dragleave', () => {
      house.classList.remove('hovered');
    });

    house.addEventListener('drop', e => {
      e.preventDefault();
      house.classList.remove('hovered');

      const paperNumber = e.dataTransfer.getData('text/plain');
      const houseNumber = house.textContent.replace('House ', '').trim();

      if (paperNumber === houseNumber) {
        house.textContent = `Delivered to House ${houseNumber}`;
        const deliveredPaper = [...papers].find(
          p => p.querySelector('.number').textContent.trim() === paperNumber
        );
        if (deliveredPaper) deliveredPaper.remove();

        if (document.querySelectorAll('.newspaper').length === 0) {
          const finalTime = stopTimer(timerDisplay);
          bestTime = saveBestTime(bestTimeDisplay, bestTime);
        }
      } else {
        alert('Wrong house! Try again.');
      }
    });
  });
}

//resets game
function resetGame() {
  location.reload();
}

//shuffle houses and set up game
document.addEventListener('DOMContentLoaded', () => {
  shuffleHousesInGrid();
  setupGame();

  const resetBtn = document.getElementById('play-btn');
  if (resetBtn) resetBtn.addEventListener('click', resetGame);
});

//easter egg
function triggerEasterEgg() {
  const newspapers = document.querySelectorAll('.newspaper');
  newspapers.forEach(np => {
    np.style.backgroundColor = 'red';
  });
  console.log('Easter Egg Activated!');
}

//user information (I don't have much to ask so I just got the name and checked that)
const playerForm = document.getElementById('playerForm');
const playerNameInput = document.getElementById('playerName');

playerForm.addEventListener('submit', e => {
  e.preventDefault();

  // Check if input is valid
  if (!playerNameInput.checkValidity()) {
    playerNameInput.classList.add('is-invalid');
    return;
  }

  // Clear previous error if valid
  playerNameInput.classList.remove('is-invalid');

  // Save name to sessionStorage
  sessionStorage.setItem('playerName', playerNameInput.value);

  //showing confirmation to user
  alert(`Hello, ${playerNameInput.value}! Settings saved.`);
});