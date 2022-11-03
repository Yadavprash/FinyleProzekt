window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 1400;
  canvas.height = 720;
  let enemies = [];
  let score = 0;
  let gameOver = false;
  const fullScreenButton = this.document.getElementById('fullScreenButton');

  class InputHandler {
    constructor() {
      this.keys = [];
      this.touchX = ' ';
      this.touchY = ' ';
      this.touchThreshold = 30;
      this.touchThresholdX = 10;
      window.addEventListener('keydown', (e) => {
        if (
          (e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight') &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        } else if (e.key === 'Enter' && gameOver == true) restartGame();
      });
      window.addEventListener('keyup', (e) => {
        if (
          e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowRight' ||
          e.key === 'ArrowLeft'
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
        // console.log(e.key, this.keys);
      });
      window.addEventListener('touchstart', (e) => {
        this.touchY = e.changedTouches[0].pageY;
        this.touchX = e.changedTouches[0].pageX;
        // console.log(e);
      });
      window.addEventListener('touchmove', (e) => {
        const swipeDistance = e.changedTouches[0].pageY - this.touchY;
        const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;
        // console.log(swipeDistanceX);
        if (
          swipeDistance < -this.touchThreshold &&
          this.keys.indexOf('swipe up') === -1
        )
          this.keys.push('swipe up');
        else if (
          swipeDistance > this.touchThreshold &&
          this.keys.indexOf('swipe down') === -1
        ) {
          this.keys.push('swipe down');
          if (gameOver) restartGame();
        } else if (
          swipeDistanceX > this.touchThresholdX &&
          this.keys.indexOf('swipe right') === -1
        ) {
          this.keys.push('swipe right');
        } else if (
          swipeDistanceX < -this.touchThresholdX &&
          this.keys.indexOf('swipe left') === -1
        ) {
          this.keys.push('swipe left');
        }
      });
      window.addEventListener('touchend', (e) => {
        // console.log(this.keys);
        this.keys.splice(this.keys.indexOf('swipe up'), 1);
        this.keys.splice(this.keys.indexOf('swipe down'), 1);
      });
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 200;
      this.height = 200;
      this.x = 100;
      this.y = this.gameHeight - this.height;
      this.image = document.getElementById('playerImage');
      this.frameX = 0;
      this.frameY = 0;
      this.speed = 0;
      this.vy = 0;
      this.weight = 0.25;
      this.maxFrame = 8;
      this.fps = 20;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
    }
    restart() {
      this.x = 100;
      this.maxFrame = 8;
      this.frameY = 0;
      this.y = this.gameHeight - this.height;
    }
    update(input, deltaTime, enemies) {
      //collisionDetection
      enemies.forEach((enemy) => {
        const dx =
          enemy.x + enemy.spiriteWidth / 2 - 20 - (this.x + this.width / 2);
        const dy =
          enemy.y + enemy.spiriteHeight / 2 - (this.y + this.height / 2 + 20);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < enemy.spiriteWidth / 2.5 + this.width / 3) {
          gameOver = true;
        }
      });

      //sprite animation
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) this.frameX = 0;
        else this.frameX++;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }

      //spriteControls
      if (
        input.keys.indexOf('ArrowRight') > -1 ||
        input.keys.indexOf('swipe right') > -1
      ) {
        this.speed = 2;
      } else if (
        input.keys.indexOf('ArrowLeft') > -1 ||
        input.keys.indexOf('swipe left') > -1
      )
        this.speed = -2;
      else this.speed = 0;
      if (
        (input.keys.indexOf('ArrowUp') > -1 ||
          input.keys.indexOf('swipe up') > -1) &&
        this.onGround()
      )
        this.vy -= 16;

      //Horizontal movement
      this.x += this.speed;
      if (this.x < 0) this.x = 0;
      else if (this.x > this.gameWidth - this.width)
        this.x = this.gameWidth - this.width;

      //vetical movement
      this.y += this.vy;
      if (this.y > this.gameHeight - this.height) {
        this.y = this.gameHeight - this.height;
      }
      if (!this.onGround()) {
        this.vy += this.weight;
        this.frameY = 1;
        this.maxFrame = 5;
      } else {
        this.frameY = 0;
        this.vy = 0;
        this.maxFrame = 8;
      }
    }
    draw(context) {
      // context.lineWidth = 5;
      // context.strokeStyle = 'white';
      // context.beginPath();
      // context.arc(
      //   this.x + this.width / 2,
      //   this.y + this.height / 2 + 20,
      //   this.width / 3,
      //   0,
      //   Math.PI * 2
      // );
      // context.stroke();
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
    onGround() {
      return this.y >= this.gameHeight - this.height;
    }
  }

  class BackGround {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = document.getElementById('background');
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 720;
      this.speed = 2;
    }
    restart() {
      this.x = 0;
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.x + this.width - this.speed,
        this.y,
        this.width,
        this.height
      );
    }
    update() {
      this.x -= this.speed;
      if (this.x < -this.width) this.x = 0;
    }
  }

  class Enemy {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 229;
      this.height = 171;
      this.spiriteWidth = this.width * 0.6;
      this.spiriteHeight = this.height * 0.6;
      this.x = gameWidth;
      this.y = gameHeight - this.spiriteHeight;
      this.frameX = 0;
      this.image = document.getElementById('enemy');
      this.markedForDeletion = false;
      this.maxFrame = 5;
      this.speed = 3;
      this.fps = 60;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
    }
    draw(context) {
      // context.strokeStyle = 'white';
      // context.beginPath();
      // context.arc(
      //   this.x + this.spiriteWidth / 2 - 20,
      //   this.y + this.spiriteHeight / 2,
      //   this.spiriteWidth / 2.5,
      //   0,
      //   Math.PI * 2
      // );
      // context.stroke();
      context.drawImage(
        this.image,
        this.frameX * this.width,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.spiriteWidth,
        this.spiriteHeight
      );
    }
    update(deltaTime) {
      this.x -= this.speed;
      if (this.framaeTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) this.frameX = 0;
        else this.frameX++;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }
      if (this.x < -this.spiriteWidth) {
        this.markedForDeletion = true;
        score++;
      }
    }
  }
  function handleEnemy(deltaTime) {
    // console.log(randomEnemyInterval);
    enemyTimer++;
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
      // console.log(enemyTimer);
      enemies.push(new Enemy(canvas.width, canvas.height));
      randomEnemyInterval = Math.random() * 1000 + 500;
      enemyTimer = 0;
      // console.log(enemies);
    } else {
      enemyTimer += deltaTime;
    }
    enemies.forEach((enemy) => {
      enemy.draw(ctx);
      enemy.update(deltaTime);
    });
    enemies = enemies.filter((enemy) => !enemy.markedForDeletion);
  }

  function displayStatusText(context) {
    context.textAlign = 'left';
    context.font = '40px Helvetica';
    context.fillStyle = 'black';
    context.fillText('Score: ' + score, 20, 50);
    context.fillStyle = 'white';
    context.fillText('Score: ' + score, 21, 53);
    if (gameOver) {
      context.textAlign = 'center';
      context.fillStyle = 'black';
      context.fillText(
        'Game Over! Press ENTER or swipe down to Restart! ',
        canvas.width / 2,
        200
      );
      context.fillStyle = 'white';
      context.fillText(
        'Game Over! Press ENTER or swipe down to Restart! ',
        canvas.width / 2 + 2,
        200
      );
    }
  }

  function restartGame() {
    player.restart();
    background.restart();
    enemies = [];
    score = 0;
    gameOver = false;
    animate(0);
  }

  function toggleFullScreen() {
    console.log(document.fullscreenElement);
    if (!document.fullscreenElement) {
      canvas.requestFullscreen().catch((err) => {
        alert(`Error,can't enable fullscreen mode:${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
  fullScreenButton.addEventListener('click', toggleFullScreen);

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new BackGround(canvas.width, canvas.height);
  const enemy = new Enemy(canvas.width, canvas.height);

  let lastTime = 0;
  let enemyTimer = 0;
  let enemyInterval = 2000;
  let randomEnemyInterval = Math.random() * 1000 + 500;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    background.update();
    player.update(input, deltaTime, enemies);
    player.draw(ctx);
    handleEnemy(deltaTime);
    displayStatusText(ctx);
    if (!gameOver) requestAnimationFrame(animate);
  }
  animate(0);
});
