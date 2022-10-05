let animationNumber = 0;
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", function (e) {
  animationNumber = e.target.value;
});

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
console.log(ctx);

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const knightAttack = new Image();
knightAttack.src = "knight/noBKG_KnightAttack_strip.png";
const knightDeath = new Image();
knightDeath.src = "knight/noBKG_knightDeath_strip.png";
const knightIdle = new Image();
knightIdle.src = "knight/noBKG_KnightIdle_strip.png";
const knightJumpAndFall = new Image();
knightJumpAndFall.src = "knight/noBKG_KnightJumpAndFall_strip.png";
const knightRoll = new Image();
knightRoll.src = "knight/noBKG_KnightRoll_strip.png";
const knightRun = new Image();
knightRun.src = "knight/noBKG_KnightRun_strip.png";
const knightShield = new Image();
knightShield.src = "knight/noBKG_KnightShield_strip.png";

const KnightArray = [
  knightAttack,
  knightDeath,
  knightIdle,
  knightJumpAndFall,
  knightRoll,
  knightRun,
  knightShield,
];

const KNIGHT_WIDTH = [144, 96, 64, 144, 180, 96, 96];
const KNIGHT_HEIGHT = 120;
const KNIGHT_DESTINATION_X = 0;
const KNIGHT_DESTINATION_Y = 140;
const NO_OF_FRAMES = [22, 15, 15, 14, 15, 8, 7];
let frameX = 0;
let gameFrame = 0;
const staggerFrames = 10;
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // ctx.drawImage(image,sx,sy,sw,sh,dx,dx,dw,dh); this is for reference
  ctx.drawImage(
    KnightArray[animationNumber],
    frameX * KNIGHT_WIDTH[animationNumber],
    0,
    KNIGHT_WIDTH[animationNumber],
    KNIGHT_HEIGHT,
    KNIGHT_DESTINATION_X,
    KNIGHT_DESTINATION_Y,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );
  if (gameFrame % staggerFrames == 0) {
    if (frameX < NO_OF_FRAMES[animationNumber] - 1) frameX++;
    else frameX = 0;
  }
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
