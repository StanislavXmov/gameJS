import { Container, Sprite } from "pixi.js";
import ChangerLevels from "./ChangerLevels";


export default class Level extends Container {

  constructor(texture, level = 0) {
    super();
    this.level = level;
    this.nextLevel = null;
    this.changerLevels = {};

    this.bg = new Sprite(texture);
    this.addChild(this.bg);

    this.player = null;

    this.StaticObjects = {};
    this.ActiveObjects = {};
    this.visible = level === '1' ? true: false;

    this.fn = null;
  }
  addPlayer(player) {
    this.player = player;
    this.addChild(this.player.player);
  }
  addActiveObject(name, obj) {
    this.ActiveObjects[name] = obj;
  }
  addStaticObject(name, obj) {
    this.StaticObjects[name] = obj;
  }
  removeAllObjects() {
    this.player.removeAllObject();
  }
  addLevelChanger(name, next, obj, player, nextPos) {
    this.nextLevel = next;
    this.changerLevels[name] = new ChangerLevels(obj.w, obj.h, obj.x, obj.y, {out: this, in: this.nextLevel}, player, nextPos);
    this.addChild(this.changerLevels[name]);
  }
  initLevel() {
    Object.keys(this.changerLevels).forEach(ch => {
      this.player.addActiveObject(this.changerLevels[ch].zoneCollider());
      this.changerLevels[ch].addChangerLevel();
    })
    // if (this.changerLevels) {
    //   this.player.addActiveObject(this.changerLevels.zoneCollider());
    //   this.changerLevels.addChangerLevel();
    // }
    Object.keys(this.ActiveObjects).forEach(o => {
      this.player.addActiveObject(this.ActiveObjects[o].zoneCollider());
      this.player.addColideObject(this.ActiveObjects[o].objCollider());
      this.addChild(this.ActiveObjects[o]);
    });
    Object.keys(this.StaticObjects).forEach(o => {
      this.player.addColideObject(this.StaticObjects[o].objCollider());
      // this.player.addColideObject(this.StaticObjects[o]);
      this.addChild(this.StaticObjects[o]);
    });
    if (this.fn) {
      this.fn();
    }
  }
  addFn(fn) {
    this.fn = fn;
  }
}