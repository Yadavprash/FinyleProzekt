export default class InputHandler {
  constructor() {
    this.lastkey = '';
    window.addEventListener('keydown', (e) => {
      //lexical scoping
      console.log(e.key);
      switch (e.key) {
        case 'ArrowLeft':
          this.lastkey = 'PRESS left';
          break;
        case 'ArrowRight':
          this.lastkey = 'PRESS right';
          break;
        case 'ArrowDown':
          this.lastkey = 'PRESS down';
          break;
        case 'ArrowUp':
          this.lastkey = 'PRESS up';
          break;
      }
    });
    window.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          this.lastkey = 'RELEASE left';
          break;
        case 'ArrowRight':
          this.lastkey = 'RELEASE right';
          break;
        case 'ArrowDown':
          this.lastkey = 'RELEASE down';
          break;
        case 'ArrowUp':
          this.lastkey = 'RELEASE up';
          break;
      }
    });
  }
}
