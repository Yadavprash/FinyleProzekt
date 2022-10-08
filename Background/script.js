const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 928);
const CANVAS_HEIGHT = (canvas.height = 793);
let gameSpeed = 4;

const backgroundLayer0 = new Image();
backgroundLayer0.src = "Backgroundlayers/Layer_0011.png";
const backgroundLayer1 = new Image();
backgroundLayer1.src = "Backgroundlayers/Layer_0010.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "Backgroundlayers/Layer_0009.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "Backgroundlayers/Layer_0008.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "Backgroundlayers/Layer_0006.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "Backgroundlayers/Layer_0005.png";
const backgroundLayer6 = new Image();
backgroundLayer6.src = "Backgroundlayers/Layer_0003.png";
const backgroundLayer7 = new Image();
backgroundLayer7.src = "Backgroundlayers/Layer_0002.png";
const backgroundLayer8 = new Image();
backgroundLayer8.src = "Backgroundlayers/Layer_0001.png";
const backgroundLayer9 = new Image();
backgroundLayer9.src = "Backgroundlayers/Layer_0000.png";
const backgroundLayer10 = new Image();
backgroundLayer10.src = "Backgroundlayers/Layer_0004_Lights.png";
const backgroundLayer11 = new Image();
backgroundLayer11.src = "Backgroundlayers/Layer_0007_Lights.png";

const slider = document.getElementById("slider");
slider.value = gameSpeed;
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener("change", function (e) {
  gameSpeed = e.target.value;
  showGameSpeed.innerHTML = e.target.value;
});

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 928;
    this.height = 793;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}
const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.3);
const layer3 = new Layer(backgroundLayer3, 0.4);
const layer4 = new Layer(backgroundLayer4, 0.5);
const layer5 = new Layer(backgroundLayer5, 0.6);
const layer6 = new Layer(backgroundLayer6, 0.7);
const layer7 = new Layer(backgroundLayer7, 0.8);
const layer8 = new Layer(backgroundLayer8, 0.9);
const layer9 = new Layer(backgroundLayer9, 1);
const layer10 = new Layer(backgroundLayer10, 0.4);
const layer11 = new Layer(backgroundLayer11, 0.6);

const gameObjects = [
  layer1,
  layer2,
  layer3,
  layer4,
  layer5,
  layer6,
  layer7,
  layer8,
  layer9,
  layer10,
  layer11,
];

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gameObjects.forEach((object) => {
    object.update();
    object.draw();
  });
  requestAnimationFrame(animate);
}
animate();
