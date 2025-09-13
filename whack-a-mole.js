const moleBoard = document.getElementById("moleBoard");
const scoreText = document.getElementById("score");
let score = 0;
let activeMole;
let gameInterval;

function startMoleGame() {
  score = 0;
  scoreText.textContent = score;
  moleBoard.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");
    moleBoard.appendChild(hole);
  }

  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(showMole, 800);
}

function showMole() {
  if (activeMole) activeMole.classList.remove("mole");
  const holes = document.querySelectorAll(".hole");
  const randomHole = holes[Math.floor(Math.random() * holes.length)];
  randomHole.classList.add("mole");
  activeMole = randomHole;

  randomHole.onclick = () => {
    if (randomHole.classList.contains("mole")) {
      score++;
      scoreText.textContent = score;
      randomHole.classList.remove("mole");
    }
  };
}
