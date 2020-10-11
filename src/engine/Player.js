import { AnimatedSprite, BaseTexture, Container, Rectangle, Texture } from "pixi.js";
import { contain } from "../utils/utils";
import Keyboard from "./Keyboard";

export default class Player {
  constructor(texture) {
    this.texture = texture;
    this.playerSheet = {};
    this.createPlayerSheet();
    this.playerDirection = 'West';

    this.player = new Container();
    this.player.zIndex = 2;

    this.playerSprite = new AnimatedSprite(this.playerSheet.standEast);
    this.player.addChild(this.playerSprite);

    this.activeObjects = [];
    this.colideObjects = [];

    this.activeLevel = '1';
    this.levelObj = {};
    this.containLevels = {};

    this.action = false;
    this.oneAction = false;
    this.takenObject = null;

    
    this.initPlayer();
    this.initPlayerControls();
  }
  initPlayer() {
    
    // this.player.anchor.set(0.5);
    this.playerSprite.animationSpeed = 0.1;
    this.playerSprite.loop = false;
    this.player.x = 50;
    this.player.y = 50;
    this.player.vx = 0;
    this.player.vy = 0;
  }
  initPlayerControls() {
    let left = new Keyboard(65),
      up = new Keyboard(87),
      right = new Keyboard(68),
      down = new Keyboard(83),
      info = new Keyboard(69),
      enter = new Keyboard(70);

    info.press = () => {
      console.log(this);
    }
    enter.press = () => {
      this.activeObjects.forEach(o => {
        if(o.activeZone) {
          if(o.type === 'take') {
            if(this.takenObject && o.id === this.takenObject.id) {
              this.takenObject.activeZone.on();
              return;
            }
            if(!this.takenObject) {
              o.on();
              return;
            }
          } else {
            console.log('else');
            o.on();
          }
        }
      })
    }
    left.press = () => {
      this.playerSprite.stop();
      this.playerDirection = 'West';
      this.player.vx = -5;
      this.player.vy = 0;
      if(!this.playerSprite.playing) {
        this.playerSprite.loop = true;
        this.playerSprite.textures = this.playerSheet[`walk${this.playerDirection}`];
        this.playerSprite.play();
      }
    };
    left.release = () => {
      if (right.isUp && down.isUp && up.isUp) {
        this.playerSprite.textures = this.playerSheet[`stand${this.playerDirection}`];
        
      }
      if (!right.isDown && this.player.vy === 0) {
        this.player.vx = 0;
      }
      if (right.isDown) {
        this.player.vx = 5;
        this.player.vy = 0;
        this.playerDirection = 'East';
        this.playerSprite.textures = this.playerSheet[`walk${this.playerDirection}`];
        this.playerSprite.play();
      }
      if (down.isDown) {
        this.player.vy = 5;
        this.player.vx = 0;
        this.playerDirection = 'South';
        this.playerSprite.textures = this.playerSheet[`walk${this.playerDirection}`];
        this.playerSprite.play();
      }
      if (up.isDown) {
        this.player.vy = -5;
        this.player.vx = 0;
        this.playerDirection = 'North';
        this.playerSprite.textures = this.playerSheet[`walk${this.playerDirection}`];
        this.playerSprite.play();
      }
    };
    up.press = () => {
      this.playerSprite.stop();
      this.playerDirection = 'North';
      this.player.vy = -5;
      this.player.vx = 0;
      if(!this.playerSprite.playing) {
        this.playerSprite.loop = true;
        this.playerSprite.textures = this.playerSheet[`walk${this.playerDirection}`];
        this.playerSprite.play();
      }
    };
    up.release = () => {
      if (right.isUp && down.isUp && left.isUp) {
        this.playerSprite.textures = this.playerSheet[`stand${this.playerDirection}`];
      }
      if (!down.isDown && this.player.vx === 0) {
        this.player.vy = 0;
      }
      if (left.isDown) {
        this.player.vx = -5;
        this.player.vy = 0;
        this.playerDirection = 'West';
        this.playerSprite.textures = this.playerSheet[`walk${this.playerDirection}`];
        this.playerSprite.play();
      }
      if (right.isDown) {
        this.player.vx = 5;
        this.player.vy = 0;
        this.playerDirection = 'East';
        this.playerSprite.textures = this.playerSheet[`walk${this.playerDirection}`];
        this.playerSprite.play();
      }
      if (down.isDown) {
        this.player.vy = 5;
        this.player.vx = 0;
        this.playerDirection = 'South';
        this.playerSprite.textures = this.playerSheet[`walk${this.playerDirection}`];
        this.playerSprite.play();
      }
    };
    right.press = () => {
      this.playerSprite.stop();
      this.playerDirection = 'East';
      this.player.vx = 5;
      this.player.vy = 0;
      if(!this.playerSprite.playing) {
        this.playerSprite.loop = true;
        this.playerSprite.textures = this.playerSheet[`walk${this.playerDirection}`];
        this.playerSprite.play();
      }
    };
    right.release = () => {
      if (left.isUp && down.isUp && up.isUp) {
        this.playerSprite.textures = this.playerSheet[`stand${this.playerDirection}`];
      }
      if (!left.isDown && this.player.vy === 0) {
        this.player.vx = 0;
      }
      if (left.isDown) {
        this.player.vx = -5;
        this.player.vy = 0;
        this.playerDirection = 'West';
        this.playerSprite.textures = this.playerSheet[`walk${this.playerDirection}`];
        this.playerSprite.play();
      }
      if (down.isDown) {
        this.player.vy = 5;
        this.player.vx = 0;
        this.playerDirection = 'South';
        this.playerSprite.textures = this.playerSheet[`walk${this.playerDirection}`];
        this.playerSprite.play();
      }
      if (up.isDown) {
        this.player.vy = -5;
        this.player.vx = 0;
        this.playerDirection = 'North';
        this.playerSprite.textures = this.playerSheet[`walk${this.playerDirection}`];
        this.playerSprite.play();
      }
    };
    down.press = () => {
      this.playerSprite.stop();
      this.playerDirection = 'South';
      this.player.vy = 5;
      this.player.vx = 0;
      if(!this.playerSprite.playing) {
        this.playerSprite.loop = true;
        this.playerSprite.textures = this.playerSheet[`walk${this.playerDirection}`];
        this.playerSprite.play();
      }
    };
    down.release = () => {
      if (right.isUp && left.isUp && up.isUp) {
        this.playerSprite.textures = this.playerSheet[`stand${this.playerDirection}`];
      }
      if (!up.isDown && this.player.vx === 0) {
        this.player.vy = 0;
      }
      if (left.isDown) {
        this.player.vx = -5;
        this.player.vy = 0;
        this.playerDirection = 'West';
        this.playerSprite.textures = this.playerSheet[`walk${this.playerDirection}`];
        this.playerSprite.play();
      }
      if (right.isDown) {
        this.player.vx = 5;
        this.player.vy = 0;
        this.playerDirection = 'East';
        this.playerSprite.textures = this.playerSheet[`walk${this.playerDirection}`];
        this.playerSprite.play();
      }
      if (up.isDown) {
        this.player.vy = -5;
        this.player.vx = 0;
        this.playerDirection = 'North';
        this.playerSprite.textures = this.playerSheet[`walk${this.playerDirection}`];
        this.playerSprite.play();
      }
    };
  }
  createPlayerSheet() {
    let sheet = new BaseTexture.from(this.texture);
    let w = 50;
    let h = 60;
    this.playerSheet['standSouth'] = [
      new Texture(sheet, new Rectangle(0 * w, 3 * h, w, h)),
    ];
    this.playerSheet['walkSouth'] = [
      
      new Texture(sheet, new Rectangle(1 * w, 3 * h, w, h)),
      new Texture(sheet, new Rectangle(2 * w, 3 * h, w, h)),
      new Texture(sheet, new Rectangle(3 * w, 3 * h, w, h)),
      new Texture(sheet, new Rectangle(4 * w, 3 * h, w, h)),
      new Texture(sheet, new Rectangle(5 * w, 3 * h, w, h)),
      new Texture(sheet, new Rectangle(6 * w, 3 * h, w, h)),
      new Texture(sheet, new Rectangle(7 * w, 3 * h, w, h)),
      new Texture(sheet, new Rectangle(0 * w, 3 * h, w, h)),
    ];
    this.playerSheet['standWest'] = [
      new Texture(sheet, new Rectangle(0 * w, 1 * h, w, h)),
    ];
    this.playerSheet['walkWest'] = [
      
      new Texture(sheet, new Rectangle(1 * w, 1 * h, w, h)),
      new Texture(sheet, new Rectangle(2 * w, 1 * h, w, h)),
      new Texture(sheet, new Rectangle(3 * w, 1 * h, w, h)),
      new Texture(sheet, new Rectangle(4 * w, 1 * h, w, h)),
      new Texture(sheet, new Rectangle(5 * w, 1 * h, w, h)),
      new Texture(sheet, new Rectangle(6 * w, 1 * h, w, h)),
      new Texture(sheet, new Rectangle(7 * w, 1 * h, w, h)),
      new Texture(sheet, new Rectangle(0 * w, 1 * h, w, h)),
    ];
    this.playerSheet['standEast'] = [
      new Texture(sheet, new Rectangle(0 * w, 0 * h, w, h)),
    ];
    this.playerSheet['walkEast'] = [
      
      new Texture(sheet, new Rectangle(1 * w, 0 * h, w, h)),
      new Texture(sheet, new Rectangle(2 * w, 0 * h, w, h)),
      new Texture(sheet, new Rectangle(3 * w, 0 * h, w, h)),
      new Texture(sheet, new Rectangle(4 * w, 0 * h, w, h)),
      new Texture(sheet, new Rectangle(5 * w, 0 * h, w, h)),
      new Texture(sheet, new Rectangle(6 * w, 0 * h, w, h)),
      new Texture(sheet, new Rectangle(7 * w, 0 * h, w, h)),
      new Texture(sheet, new Rectangle(0 * w, 0 * h, w, h)),
    ];
    this.playerSheet['standNorth'] = [
      new Texture(sheet, new Rectangle(0 * w, 2 * h, w, h)),
    ];
    this.playerSheet['walkNorth'] = [
      
      new Texture(sheet, new Rectangle(1 * w, 2 * h, w, h)),
      new Texture(sheet, new Rectangle(2 * w, 2 * h, w, h)),
      new Texture(sheet, new Rectangle(3 * w, 2 * h, w, h)),
      new Texture(sheet, new Rectangle(4 * w, 2 * h, w, h)),
      new Texture(sheet, new Rectangle(5 * w, 2 * h, w, h)),
      new Texture(sheet, new Rectangle(6 * w, 2 * h, w, h)),
      new Texture(sheet, new Rectangle(7 * w, 2 * h, w, h)),
      new Texture(sheet, new Rectangle(0 * w, 2 * h, w, h)),
    ];
  }
  objectCollider() {
    this.colideObjects.forEach(o => {
      if (this.action) {
        if(this.playerCollider({x: this.player.x - 20, y: this.player.y - 10, height: this.player.height + 20, width: this.player.width + 40 }, o)) {
          
          if (o.dir) {
            const obj = o.obj;
            if (obj.isOn){
              return;
            }
            obj.active = true;
            obj.blockedDir !== this.playerDirection ? obj.blockedDir = null: null;
            obj.move(this.playerDirection, o);
          }
          if (this.player.vx > 0) {
            // this.player.vx = 0;
            this.player.x -= 5;
          }
          if (this.player.vx < 0) {
            // this.player.vx = 0;
            this.player.x += 5;
          }
          if (this.player.vy > 0) {
            // this.player.vy = 0;
            this.player.y -= 5;
          }
          if (this.player.vy < 0) {
            // this.player.vy = 0;
            this.player.y += 5;
          }
        }
      }
      if(this.playerCollider(this.player, o)) {
        // if (this.takenObject && (!o.obj || this.takenObject.id !== o.obj.id)) {
        //   console.log('happend?');
        //   this.takenObject.isOn = true;
        //   this.takenObject.isDrop = false;
        // }
        if (o.dir) {
          const obj = o.obj;
          if (obj.isOn){
            return;
          }
          obj.active = true;
          obj.blockedDir !== this.playerDirection ? obj.blockedDir = null: null;
          obj.move(this.playerDirection, o);
        }
        if (this.player.vx > 0) {
          // this.player.vx = 0;
          this.player.x -= 5;
        }
        if (this.player.vx < 0) {
          // this.player.vx = 0;
          this.player.x += 5;
        }
        if (this.player.vy > 0) {
          // this.player.vy = 0;
          this.player.y -= 5;
        }
        if (this.player.vy < 0) {
          // this.player.vy = 0;
          this.player.y += 5;
        }
      }
    });
  }
  activeZoneCollider() {
    this.activeObjects.forEach(o => {
      if(o.isActiveZone) {
        if(this.playerCollider(this.player, o)) {
          o.activeZone = true;
        } else {
          o.activeZone = false;
        }
      }
    });
  }
  playerCollider = (r1, r2) => {
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
    hit = false;
  
    r1.centerX = r1.x + 14 + (r1.width - 28) / 2; 
    r1.centerY = r1.y + 5 + (r1.height - 10) / 2; 
    r2.centerX = r2.x + r2.width / 2; 
    r2.centerY = r2.y + r2.height / 2;
  
    r1.halfWidth = (r1.width - 28) / 2;
    r1.halfHeight = (r1.height - 10) / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;
  
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;
  
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  
    if (Math.abs(vx) < combinedHalfWidths) {
  
      if (Math.abs(vy) < combinedHalfHeights) {
        hit = true;
      } else {
        hit = false;
      }
    } else {
      hit = false;
    }
    return hit;
  };
  addActiveObject(obj) {
    this.activeObjects.push(obj);
  }
  addColideObject(obj) {
    this.colideObjects.push(obj);
  }
  removeAllObject() {
    this.activeObjects = [];
    this.colideObjects = [];
  }
  setActiveLevel(lvl) {
    this.levelObj = lvl;
    this.activeLevel = lvl.level;
     
  }
  containLevel() {
    return contain(this.player, this.containLevels[this.activeLevel]);
  }
  addContainLevel(lvl, obj) {
    this.containLevels[lvl] = obj;
  }
  move() {
    this.player.x += this.player.vx;
    this.player.y += this.player.vy;
  }

}
