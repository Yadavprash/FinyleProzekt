const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.width = 700);
let gameSpeed = 5;

const backgroundLayer0 = new Image();
backgroundLayer0.src = "Background layers/Layer_0000.png";
const backgroundLayer1 = new Image();
backgroundLayer1.src = "Background layers/Layer_0001.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "Background layers/Layer_0002.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "Background layers/Layer_0003.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "Background layers/Layer_0004_Lights.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "Background layers/Layer_0005.png";
const backgroundLayer6 = new Image();
backgroundLayer6.src = "Background layers/Layer_0006.png";
const backgroundLayer7 = new Image();
backgroundLayer7.src = "Background layers/Layer_0007_Lights.png";
const backgroundLayer8 = new Image();
backgroundLayer8.src = "Background layers/Layer_0008.png";
const backgroundLayer9 = new Image();
backgroundLayer9.src = "Background layers/Layer_0009.png";
const backgroundLayer10 = new Image();
backgroundLayer10.src = "Background layers/Layer_0010.png";
const backgroundLayer11 = new Image();
backgroundLayer11.src = "Background layers/Layer_0011.png";
let x = 0;
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundLayer9, 0, 0);
  requestAnimationFrame(animate);
}
