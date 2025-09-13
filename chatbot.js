const chatMessage = document.getElementById("chatMessage");
const messages = [
  "Hi there! 🤖 Welcome to Mini Games Hub!",
  "Which game would you like to play today? 🎮",
  "Have fun and challenge yourself! 😎"
];

let msgIndex = 0;

function typeMessage(message, i = 0) {
  if (i < message.length) {
    chatMessage.innerHTML += message.charAt(i);
    setTimeout(() => typeMessage(message, i + 1), 50);
  } else {
    msgIndex++;
    if (msgIndex < messages.length) {
      setTimeout(() => {
        chatMessage.innerHTML = "";
        typeMessage(messages[msgIndex]);
      }, 1000);
    }
  }
}

typeMessage(messages[msgIndex]);

function selectGame(gameUrl) {
  chatMessage.innerHTML = "Great choice! Redirecting you... ⏳";
  setTimeout(() => {
    window.location.href = gameUrl;
  }, 1200);
}





// Modal open/close
const modal = document.getElementById("funExtrasModal");
const openBtn = document.getElementById("openFunExtras");
const closeBtn = document.getElementsByClassName("close")[0];

openBtn.onclick = () => modal.style.display = "block";
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
  if(event.target === modal) modal.style.display = "none";
};

// Mini Chatbot Game: Guess Number
function startGuessNumber() {
  const numberToGuess = Math.floor(Math.random() * 10) + 1;
  let attempts = 3;
  let guess;
  while(attempts > 0) {
    guess = prompt(`Guess a number between 1 and 10. Attempts left: ${attempts}`);
    if (guess === null) return;
    guess = parseInt(guess);
    if (guess === numberToGuess) {
      alert("🎉 Correct! You guessed the number!");
      return;
    } else {
      attempts--;
      alert(guess > numberToGuess ? "Too high!" : "Too low!");
    }
  }
  alert(`❌ Out of attempts! The number was ${numberToGuess}`);
}

