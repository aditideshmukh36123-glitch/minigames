const board = document.getElementById("memoryBoard");
const status = document.getElementById("memoryStatus");

let cards = ["🍎","🍎","🍌","🍌","🍇","🍇","🍓","🍓"];
let flipped = [];
let matched = [];

function startMemoryGame() {
  board.innerHTML = "";
  flipped = [];
  matched = [];
  cards = cards.sort(() => Math.random() - 0.5);

  cards.forEach((emoji, i) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = emoji;
    card.innerHTML = "?";
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });

  status.textContent = "Find all pairs!";
}

function flipCard(card) {
  if (flipped.length < 2 && !flipped.includes(card) && !matched.includes(card)) {
    card.innerHTML = card.dataset.value;
    flipped.push(card);

    if (flipped.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

function checkMatch() {
  if (flipped[0].dataset.value === flipped[1].dataset.value) {
    matched.push(flipped[0], flipped[1]);
    status.textContent = "Matched! 🎉";
  } else {
    flipped[0].innerHTML = "?";
    flipped[1].innerHTML = "?";
    status.textContent = "Try again 😅";
  }
  flipped = [];

  if (matched.length === cards.length) {
    status.textContent = "You Won! 🏆";
  }
}

startMemoryGame();
