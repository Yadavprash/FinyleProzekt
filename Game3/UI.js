export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = 'Helvetica';
  }
  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsety = 2;
    context.shadowColor = 'white';
    context.shadowBlur = 0;
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.fillStyle = this.game.fontColor;
    //score
    context.fillText('Score: ' + this.game.score, 20, 50);
    //timer
    context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
    context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
    //gameOverMessage
    if (this.game.time > this.game.maxTime) {
      if (this.game.score > 5) {
        context.textAlign = 'center';
        context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
        context.fillText(
          'Boo-yah',
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fillText(
          'Oh yeah! Thats how it done baby :) .',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      } else {
        context.textAlign = 'center';
        context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
        context.fillText(
          'Sheesh!',
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fillText(
          'Better Luck Next Time',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      }
    }
    context.restore();
  }
}
