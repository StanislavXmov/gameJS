import {Sprite} from "pixi.js";

export default class PhysicsGameObject extends Sprite {

  constructor(id, texture, lvl, x, y, _x = 0, _y = 0) {
    super(texture);
    this.id = id;
    this.position.set(x, y);
    this._x = _x;
    this._y = _y;
    this.v = 1;
    this.objectCollider = {}
    this.collideObjects = [];
    this.blockedDir = null;
    this.movededDir = null;
    this.activeLevel = lvl;
    this.containLevels = {};
    this.active = false;
    this.isOn = false;
    this.isDrop = false;
    this.activeZone = {};

    this.takeDir = {
      'West': {x:-10, y: 10},
      'East': {x: 35, y: 10},
      'North': {x: 13, y: -10},
      'South': {x: 13, y: 34},
    }
    this.dropDir = {
      'West': {x:-30, y: 10},
      'East': {x: 55, y: 10},
      'North': {x: 13, y: -30},
      'South': {x: 13, y: 54},
    }

  }
  objCollider() {
    this.objectCollider = {
      x: this.x + this._x / 2,
      y: this.y + this._y / 2,
      width: this.width - this._x,
      height: this.height - this._y,
      dir: true,
      obj: this,
      id: this.id
    }
    return this.objectCollider;
  }
  addCollideObjects(objs){
    this.collideObjects = objs.filter(o => {
      return o.id !== this.id
    });
  }
  objectCollided() {
    if (this.isOn) {
      return;
    }
    this.collideObjects.forEach(o => {
      if(this.collider(this, o)) {
        if (o.obj && o.obj.isOn) {
          return;
        }
        if (this.active) {
          if (this.movededDir === 'West') {
            this.x += 4;
            this.objectCollider.x += 4; 
          }
          if (this.movededDir === 'East') {
            this.x -= 4;
            this.objectCollider.x -= 4;
          }
          if (this.movededDir === 'North') {
            this.y += 4;
            this.objectCollider.y += 4;
          }
          if (this.movededDir === 'South') {
            this.y -= 4;
            this.objectCollider.y -= 4;
          }
          
          this.blockedDir = this.movededDir;
        }
      }
    });
    this.active = false;
  }
  collider = (r1, r2) => {
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
  move(dir, obj) {
    if (dir === 'South' && this.blockedDir !== 'South') {
      this.movededDir = dir;
      this.y = this.y + this.v;
      obj.y = obj.y + this.v;
    }
    if (dir === 'East' && this.blockedDir !== 'East') {
      this.movededDir = dir;
      this.x = this.x + this.v;
      obj.x = obj.x + this.v;
    }
    if (dir === 'North' && this.blockedDir !== 'North') {
      this.movededDir = dir;
      this.y = this.y - this.v;
      obj.y = obj.y - this.v;
    }
    if (dir === 'West' && this.blockedDir !== 'West') {
      this.movededDir = dir;
      this.x = this.x - this.v;
      obj.x = obj.x - this.v;
    }
  }
  containLevel() {
    let dir = this.contain(this.containLevels[this.activeLevel]);
    if (dir === 'left') {
      this.x += 5;
      this.objectCollider.x += 5; 
    }
    if (dir === 'rigth') {
      this.x -= 5;
      this.objectCollider.x -= 5;
    }
    if (dir === 'bottom') {
      this.y += 5;
      this.objectCollider.y += 5;
    }
    if (dir === 'top') {
      this.y -= 5;
      this.objectCollider.y -= 5;
    }
  }
  addContainLevel(lvl, obj) {
    this.containLevels[lvl] = obj;
  }
  contain(container) {
    // console.log(container.x);
    let collision = undefined;
    if (this.x < container.x) {
      this.x = container.x;
      this.objectCollider.x = container.x;
      collision = "left";
    }
    if (this.y < container.y) {
      this.y = container.y;
      this.objectCollider.y = container.y;
      collision = "top";
    }
    if (this.x + this.width > container.width) {
      this.x = container.width - this.width;
      this.objectCollider.x = container.width - this.width;
      collision = "right";
    }
    if (this.y + this.height > container.height) {
      this.y = container.height - this.height;
      this.objectCollider.y = container.height - this.height;
      collision = "bottom";
    }
    return collision;
  }
  taken(player) {
    if (this.isOn) {
      if (player.playerDirection === 'North') {
        this.zIndex = 1;
        player.levelObj.sortChildren();
      } else {
        this.zIndex = 3;
        player.levelObj.sortChildren();
      }
      
      this.x = player.player.x + this.takeDir[player.playerDirection].x;
      this.y = player.player.y + this.takeDir[player.playerDirection].y;
      this.objectCollider.x = player.player.x + this.takeDir[player.playerDirection].x + this._x / 2;
      this.objectCollider.y = player.player.y + this.takeDir[player.playerDirection].y + this._y / 2;
      this.activeZone.x = player.player.x + this.takeDir[player.playerDirection].x - 15;
      this.activeZone.y = player.player.y + this.takeDir[player.playerDirection].y - 15;
    }
    if (this.isDrop) {
      console.log(`drop ${this.id}`);
      this.x = player.player.x + this.dropDir[player.playerDirection].x;
      this.y = player.player.y + this.dropDir[player.playerDirection].y;
      this.objectCollider.x = player.player.x + this.dropDir[player.playerDirection].x + this._x / 2;
      this.objectCollider.y = player.player.y + this.dropDir[player.playerDirection].y + this._y / 2;
      this.activeZone.x = player.player.x + this.dropDir[player.playerDirection].x - 15;
      this.activeZone.y = player.player.y + this.dropDir[player.playerDirection].y - 15;
      this.isDrop = false;
    }
  }
  addActiveZone(player) {
    this.activeZone = {
      type: 'take',
      id: this.id,
      x: this.x - 15,
      y: this.y - 15,
      width: this.width + 30,
      height: this.height + 30,
      isActiveZone: true,
      active: this.active,
      activeZone: false,
      isOn: this.isOn,
      on: () => {
        
        this.active = !this.active;
        this.isOn = !this.isOn;
        
        player.action = !player.action;
        if (!this.isOn) {
          this.isDrop = true;
          player.takenObject = null;
        } else {
          console.log(`take ${this.id}`);
          player.takenObject = this;
        }
        this.scale.set(this.isOn ? 0.8: 1);
      }
    }
    return this.activeZone;
  }
}