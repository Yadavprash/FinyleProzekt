let playerSelect = 0;
const selection = document.getElementById("character");
selection.addEventListener("change", function (f) {
  playerSelect = f.target.value;
});

let playerState = "attack";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", function (e) {
  playerState = e.target.value;
});

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
console.log(ctx);

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

const ninjaBoy = new Image();
ninjaBoy.src = "ninjaBoy.png";
const ninjaGirl = new Image();
ninjaGirl.src = "ninjaGirl.png";

const ninja = [ninjaBoy, ninjaGirl];

const spiriteWidth = [268, 268];
const spiriteHeight = [248, 248];

let gameFrame = 0;
const staggerFrame = 11;
const spiriteAnimations = [];
const animationStates = [
  {
    name: "attack",
    frames: 10,
  },
  {
    name: "climb",
    frames: 10,
  },
  {
    name: "dead",
    frames: 10,
  },
  {
    name: "glide",
    frames: 10,
  },
  {
    name: "idle",
    frames: 10,
  },
  {
    name: "jump",
    frames: 10,
  },
  {
    name: "jumpAttack",
    frames: 10,
  },
  {
    name: "jumpThrow",
    frames: 10,
  },
  {
    name: "run",
    frames: 10,
  },
  {
    name: "slide",
    frames: 10,
  },
  {
    name: "throw",
    frames: 10,
  },
];
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spiriteWidth[playerSelect];
    let positiony = index * spiriteHeight[playerSelect];
    frames.loc.push({ x: positionX, y: positiony });
  }
  spiriteAnimations[state.name] = frames;
});
console.log(spiriteAnimations);

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position =
    Math.floor(gameFrame / staggerFrame) %
    spiriteAnimations[playerState].loc.length;
  let frameX = spiriteWidth[playerSelect] * position;
  let frameY = spiriteAnimations[playerState].loc[position].y;

  ctx.drawImage(
    ninja[playerSelect],
    frameX,
    frameY,
    spiriteWidth[playerSelect],
    spiriteHeight[playerSelect],
    300,
    200,
    spiriteWidth[playerSelect],
    spiriteHeight[playerSelect]
  );

  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
