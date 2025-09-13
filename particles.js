const canvas = document.getElementById("bgParticles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const emojiList = ["🎮","🃏","❌","⭕","🐹","⭐"];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 20 + 10;
    this.speedY = Math.random() * 1 + 0.2;
    this.emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
  }

  update() {
    this.y -= this.speedY;
    if (this.y < -50) {
      this.y = canvas.height + 20;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.font = this.size + "px Arial";
    ctx.fillText(this.emoji, this.x, this.y);
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

initParticles();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});
