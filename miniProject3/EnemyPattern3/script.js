/**@type{HTMLCanvasElement}*/
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);

const numberOfEnemies = 100;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "enemy3.png";
    this.speed = Math.random() * 1 + 1; // makes the speed variable randomly b/w -2 and +2
    this.spiriteWidth = 218;
    this.spiriteHeight = 177;
    this.width = this.spiriteWidth / 2.5;
    this.height = this.spiriteHeight / 2.5;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = Math.random() * 500;
    this.angleSpeed = Math.random() * 0.5;
    // this.curve = Math.random() * 200 + 50;
    this.offsetWidth = CANVAS_WIDTH / 2 - this.width / 2;
    this.offsetHeight = CANVAS_HEIGHT / 2 - this.height / 2;
  }
  update() {
    this.x =
      this.offsetWidth * Math.sin(this.angle * (Math.PI / 300)) +
      this.offsetWidth;
    this.y =
      this.offsetHeight * Math.cos(this.angle * (Math.PI / 200)) +
      this.offsetHeight;
    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) this.x = CANVAS_WIDTH;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    // ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.frame * this.spiriteWidth,
      0,
      this.spiriteWidth,
      this.spiriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}
// console.log(enemiesArray);
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // enemy1.update();
  // enemy1.draw();
  enemiesArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
