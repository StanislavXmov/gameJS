import {Sprite} from "pixi.js";


export default class GameObject extends Sprite {

  constructor(texture, x, y, _x = 0, _y = 0) {
    super(texture);
    this.position.set(x, y);
    this._x = _x;
    this._y = _y;

  }
  objCollider() {
    return {
      x: this.x + this._x / 2,
      y: this.y + this._y / 2,
      width: this.width - this._x,
      height: this.height - this._y,
    }
  }
}