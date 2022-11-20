import {
  StandingLeft,
  StandingRight,
  Sittingleft,
  SittingRight,
  RunningLeft,
  RunningRight,
  JumpingLeft,
  JumpingRight,
  FallingLeft,
  FallingRight,
} from './state.js';

export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.states = [
      new StandingLeft(this),
      new StandingRight(this),
      new Sittingleft(this),
      new SittingRight(this),
      new RunningLeft(this),
      new RunningRight(this),
      new JumpingLeft(this),
      new JumpingRight(this),
      new FallingLeft(this),
      new FallingRight(this),
    ];
    this.currentState = this.states[1];
    this.image = document.getElementById('dogImage');
    this.width = 200;
    this.height = 181.83;
    this.x = this.gameWidth / 2 - this.width / 2;
    this.y = this.gameHeight - this.height;
    this.frameX = 0;
    this.frameY = 0;
    this.vy = 0;
    this.gravity = 0.5;
    this.speed = 0;
    this.maxSpeed = 5;
    this.maxFrame = 6;
    this.fps = 35;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
  }
  draw(context, deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    context.drawImage(
      this.image,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update(input) {
    this.currentState.handleInput(input);
    //Horizontal movement
    this.x += this.speed;
    if (this.x < 0) this.x = 0;
    if (this.x > this.gameWidth - this.width)
      this.x = this.gameWidth - this.width;
    //Vertical movement
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.gravity;
    else this.vy = 0;

    if (this.y > this.gameHeight - this.height)
      this.y = this.gameHeight - this.height;
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
  onGround() {
    return this.y >= this.gameHeight - this.height;
  }
}