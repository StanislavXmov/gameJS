import { AnimatedSprite, BaseTexture, Container, Graphics, Rectangle, Sprite, Texture } from "pixi.js";

export default class ActiveGameObject extends Container {

  static getBaseAnimationState(w, h, stateArray) {
    const baseAnimationState = {};
    stateArray.forEach(obj => {
      if (obj.pattern[0].length) {
        baseAnimationState[obj.name] = obj.pattern.map(p => {
          const [x,y] = p;
          return [x * w, y * h, w, h];
        })
      } else {
        const [x,y] = obj.pattern;
        baseAnimationState[obj.name] = [x * w, y * h, w, h];
      }
    });
    return baseAnimationState;
  }

  constructor(texture, w, h, obj, x, y, _x = 0, _y = 0, activeZone = null) {
    super();
    this.texture = texture;
    this.w = w;
    this.h = h;
    this.obj = obj;

    this.objSheet = {};
    this.createObjectSheet();
    this.objSprite = new AnimatedSprite(this.objSheet.off);
    this.objSprite.animationSpeed = 0.1;

    this.addChild(this.objSprite);
    this.position.set(x, y);
    this.x = x;
    this.y = y;
    this._x = _x;
    this._y = _y;
    this.activeZone = activeZone;
    this.zone = this.setActiveZone() || null;
    this.active = false;

  }
  createObjectSheet(obj) {
    let sheet = new BaseTexture.from(this.texture);
    Object.keys(this.obj).forEach(key => {
      if (this.obj[key][0].length) {
        this.objSheet[key] = [];
        this.obj[key].forEach(p => {
          const [a,b,c,d] = p;
          this.objSheet[key].push(
            new Texture(sheet, new Rectangle(a,b,c,d)),
          );
        });
      } else {
        const [a,b,c,d] = this.obj[key];
        this.objSheet[key] = [
          new Texture(sheet, new Rectangle(a,b,c,d)),
        ];
      }
      
    })
    // this.objSheet['off'] = [
    //   new Texture(sheet, new Rectangle(0 * w, 0 * h, w, h)),
    // ];
    // this.objSheet['on'] = [
    //   new Texture(sheet, new Rectangle(1 * w, 0 * h, w, h)), 
    // ];
    
  }
  objCollider() {
    if (this.activeZone) {
      return {
        x: this.x + this._x / 2,
        y: this.y + this._y / 2,
        width: this.w - this._x,
        height: this.h - this._y,
      }
    }
    return {
      x: this.x + this._x / 2,
      y: this.y + this._y / 2,
      width: this.width - this._x,
      height: this.height - this._y,
    }
  }
  setActiveZone() {
    if (this.activeZone) {
      const {x, y, w, h} = this.activeZone;
      const rectangle = new Graphics();
      rectangle.lineStyle(2, 0xFF3300, 1);
      // rectangle.beginFill(0x000000);
      rectangle.visible = false;
      rectangle.drawRect(0, 0, w, h);
      rectangle.endFill();
      rectangle.x = x;
      rectangle.y = y;
      rectangle._x = rectangle.x + this.x;
      rectangle._y = rectangle.y + this.y;
      this.addChild(rectangle);
      return rectangle;
    }
  }
  zoneCollider() {
    return {
      x: this.zone._x,
      y: this.zone._y,
      width: this.zone.width,
      height: this.zone.height,
      isActiveZone: true,
      active: this.active,
      activeZone: false,
      on: () => {
        console.log('on');
        // this.zone.visible = false;
        this.active ? this.objSprite.textures = this.objSheet[`off`] : this.objSprite.textures = this.objSheet[`on`];
        this.objSprite.loop = true;
        this.objSprite.play();
        this.active = !this.active;
      }
    }
  }
}

