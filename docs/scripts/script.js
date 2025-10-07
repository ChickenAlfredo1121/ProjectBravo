function shuffleHousesInGrid() {
    const container = document.querySelector('.deliveryHouses');
    if (!container) return;

    const houses = Array.from(container.querySelectorAll('.house'));
    if (houses.length === 0) return;

    // Shuffle array
    const shuffled = houses.sort(() => Math.random() - 0.5);

    // Re-append shuffled houses (changes grid order)
    shuffled.forEach(house => container.appendChild(house));
}

document.addEventListener("DOMContentLoaded", shuffleHousesInGrid);

const resetBtn = document.getElementById("resetButton");
if (resetBtn) {
    resetBtn.addEventListener("click", shuffleHousesInGrid);
}
