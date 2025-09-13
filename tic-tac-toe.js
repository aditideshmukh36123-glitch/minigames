const board = document.getElementById("ticTacToe");
const statusText = document.getElementById("status");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");

let mode = "pvp";
let emojis = ["❌","⭕"];
let currentPlayer = "X";
let cells = Array(9).fill("");
let gameActive = true;

// Scoreboard
let score = {X:0,O:0,Draw:0};
const playerXScore = document.getElementById("playerXScore");
const playerOScore = document.getElementById("playerOScore");
const drawScore = document.getElementById("drawScore");

// Mode & Emoji Select
const modeSelect = document.getElementById("modeSelect");
const emojiSelect = document.getElementById("emojiSelect");

modeSelect.onchange = (e) => {
  mode = e.target.value;
  resetGame();
};

emojiSelect.onchange = (e) => {
  const val = e.target.value;
  if(val==="XO") emojis=["❌","⭕"];
  else if(val==="catDog") emojis=["🐱","🐶"];
  else emojis=["🌞","🌛"];
  resetGame();
};

// Render Board
function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell,index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.textContent = cell ? (cell==="X"?emojis[0]:emojis[1]) : "";
    div.addEventListener("click", () => makeMove(index));
    board.appendChild(div);
  });
}

// Make Move
function makeMove(index){
  if(cells[index]!="" || !gameActive) return;
  cells[index] = currentPlayer;
  clickSound.play();
  renderBoard();
  checkWinner();
  if(gameActive){
    currentPlayer = currentPlayer==="X"?"O":"X";
    if(mode==="pvc" && currentPlayer==="O") {
      // slow down computer move
      setTimeout(() => aiMove(), 600); // 600ms delay
    }
  }
}

// AI Move
function aiMove(){
  let empty = cells.map((v,i)=>v===""?i:null).filter(v=>v!==null);
  if(empty.length===0) return;
  let choice = empty[Math.floor(Math.random()*empty.length)];
  cells[choice] = "O";
  clickSound.play();
  renderBoard();
  checkWinner();
  currentPlayer = "X";
}

// Check Winner
function checkWinner(){
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  let won=false;
  for(let p of winPatterns){
    const [a,b,c]=p;
    if(cells[a] && cells[a]===cells[b] && cells[a]===cells[c]){
      gameActive=false;
      score[cells[a]]++;
      updateScoreboard();
      showChampion(cells[a]);
      winSound.play();
      won=true;
      break;
    }
  }
  if(!won && !cells.includes("")){
    statusText.textContent="It's a Draw! 😮";
    gameActive=false;
    score.Draw++;
    updateScoreboard();
  }
}

// Show Champion Overlay
function showChampion(player){
  const msgDiv = document.getElementById("championMessage");
  msgDiv.textContent = `🏆 Player ${player} is the CHAMPION! 🏆`;
  msgDiv.style.display = "block";
  setTimeout(()=> msgDiv.style.display="none", 3000);
}

// Update Scoreboard
function updateScoreboard(){
  playerXScore.textContent=`X: ${score.X}`;
  playerOScore.textContent=`O: ${score.O}`;
  drawScore.textContent=`Draws: ${score.Draw}`;
}

// Reset Game
function resetGame(){
  cells=Array(9).fill("");
  currentPlayer="X";
  gameActive=true;
  statusText.textContent="";
  renderBoard();
}

renderBoard();
