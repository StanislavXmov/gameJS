import { Container, Graphics } from "pixi.js";

export default class ChangerLevels extends Container {

  constructor(w, h, x, y, scenes, player, nextPos) {
    super();
    this.w = w;
    this.h = h;

    this.x = x;
    this.y = y;
    this.zone = this.setActiveZone();
    this.position.set(this.x, this.y);
    this.active = false;
    this.nextPos = nextPos;

    this.in = scenes.in;
    this.out = scenes.out;
    this.player = player;
  }
  setActiveZone() {
    const rectangle = new Graphics();
    rectangle.lineStyle(2, 0xFF3300, 1);
    // rectangle.beginFill(0x000000);
    rectangle.visible = false;
    rectangle.drawRect(0, 0, this.w, this.h);
    rectangle.endFill();
    rectangle.x = 0;
    rectangle.y = 0;
    // this.addChild(rectangle);
    return rectangle;
  }
  addChangerLevel() {
    this.addChild(this.zone);
  }
  zoneCollider() {
    return {
      x: this.x,
      y: this.y,
      width: this.w,
      height: this.h,
      isActiveZone: true,
      active: this.active,
      activeZone: false,
      on: () => {
        console.log('on');
        // this.zone.visible = this.active;
        this.active = !this.active;
        this.out.removeAllObjects();
        this.out.visible = false;
        this.in.addPlayer(this.player);
        this.player.setActiveLevel(this.in)
        this.in.initLevel();
        this.in.visible = true;
        // this.in.addChild(this.player.player);
        this.player.player.x = this.nextPos.x;
        this.player.player.y = this.nextPos.y;
      }
    }
  }
}