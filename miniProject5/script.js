/**@type{HTMLCanvasElement}*/
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.getElementById("collisionCanvas");
const collisionctx = collisionCanvas.getContext("2d");
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let lives = 3;
let gameOver = false;
let score = 0;
let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;
let ravens = [];
let explosions = [];

class Explosion {
  constructor(x, y, size) {
    this.image = new Image();
    this.image.src = "boom.png";
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.size = size;
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.sound = new Audio();
    this.sound.src = "boom.ogg";
    this.timeSinceLastFrame = 0;
    this.frameInterval = 200;
    this.markedForDeletion = false;
  }
  update(deltatime) {
    if (this.frame === 0) this.sound.play();
    this.timeSinceLastFrame += deltatime;
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++;
      if (this.frame > 5) {
        this.markedForDeletion = true;
      }
      this.timeSinceLastFrame = 0;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y - this.size * 0.4,
      this.size,
      this.size
    );
  }
}
class Raven {
  constructor() {
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.sizeModifier = Math.random() * 0.3 + 0.25;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.directionX = Math.random() * 2 + 1;
    this.directionY = Math.random() * 2 - 0.5;
    this.markedForDeletion = false;
    this.image = new Image();
    this.image.src = "raven.png";
    this.frame = 0;
    this.timer = 0;
    this.maxFrame = 4;
    this.timeSinceFlap = 0;
    this.flapInterval = Math.random() * 100 + 100;
    this.randomColors = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
    this.color =
      "rgb(" +
      this.randomColors[0] +
      "," +
      this.randomColors[1] +
      "," +
      this.randomColors[2] +
      ")";
  }

  update(deltatime) {
    // if (this.frame === 0) this.sound.play();
    this.timer++;
    this.timeSinceFlap += deltatime;

    if (this.y < 0 || this.y > canvas.height - this.height)
      this.directionY = this.directionY * -1;

    this.x -= this.directionX;
    this.y += this.directionY;

    if (this.x < 0 - this.width) this.markedForDeletion = true;

    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) this.frame = 0;
      else this.frame++;
      this.timeSinceFlap = 0;
    }
    if (this.x < 0 - this.width) lives--;
    if (lives === 0) gameOver = true;
  }

  draw() {
    collisionctx.fillStyle = this.color;
    collisionctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

ctx.font = "30px Impact";

function drawScore() {
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 50, 75);
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 55, 78);
  ctx.fillStyle = "black";
  ctx.fillText(` lives ${lives - 1}`, 200, 75);
  ctx.fillStyle = "white";
  ctx.fillText("lives: " + (lives - 1), 205, 78);
}

function drawGameOver() {
  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  ctx.fillText(
    `Game Over--Your Score:${score}`,
    canvas.width * 0.5,
    canvas.height * 0.5
  );
  ctx.fillStyle = "white";
  ctx.fillText(
    `Game Over--Your Score:${score}`,
    canvas.width * 0.5,
    canvas.height * 0.5 + 5
  );
}

window.addEventListener("click", function (e) {
  const detectPixelColor = collisionctx.getImageData(e.x, e.y, 1, 1);
  const pc = detectPixelColor.data;

  ravens.forEach((object) => {
    if (
      object.randomColors[0] === pc[0] &&
      object.randomColors[1] === pc[1] &&
      object.randomColors[2] === pc[2]
    ) {
      object.markedForDeletion = true;
      score++;
      explosions.push(new Explosion(object.x, object.y, object.width));
    }
  });
});

const raven = new Raven();

function animate(timestamp) {
  collisionctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let deltatime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextRaven += deltatime;

  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven());
    timeToNextRaven = 0;
    ravens.sort(function (a, b) {
      return a.width - b.width;
    });
  }
  drawScore();

  //spreading all ravens in a single array and calling for each for every raven
  [...ravens, ...explosions].forEach((object) => object.update(deltatime));
  [...ravens, ...explosions].forEach((object) => object.draw());
  ravens = ravens.filter((object) => !object.markedForDeletion);
  explosions = explosions.filter((object) => !object.markedForDeletion);

  if (gameOver != true) requestAnimationFrame(animate);
  else drawGameOver();
}
animate(0);
