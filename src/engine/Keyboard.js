export default class Keyboard {
  constructor(keyCode) {
    this.code = keyCode;
    this.isDown = false;
    this.isUp = true;
    this.press = undefined;
    this.release = undefined;

    this.init();
  }
  downHandler(e) {
    if (e.keyCode === this.code) {
      if (this.isUp && this.press) this.press();
      this.isDown = true;
      this.isUp = false;
    }
    e.preventDefault();
  }
  upHandler(e) {
    if (e.keyCode === this.code) {
      if (this.isDown && this.release) this.release();
      this.isDown = false;
      this.isUp = true;
    }
    e.preventDefault();
  }
  init() {
    window.addEventListener(
    "keydown", e => this.downHandler(e)
    );
    window.addEventListener(
      "keyup", e => this.upHandler(e)
    );
  }
  // init() {
  //   window.addEventListener(
  //   "keydown", this.downHandler.bind(this), false
  //   );
  //   window.addEventListener(
  //     "keyup", this.upHandler.bind(this), false
  //   );
  // }
}