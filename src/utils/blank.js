

  // rectangle = new Graphics();
  // rectangle.lineStyle(4, 0xFF3300, 1);
  // rectangle.beginFill(0x66CCFF);
  // rectangle.drawRect(0, 0, 32, 124);
  // rectangle.endFill();
  // rectangle.x = 170;
  // rectangle.y = 170;
  // gameScene.addChild(rectangle);
  // rect2 = new Graphics();
  // rectangle.lineStyle(4, 0xFF3300, 1);
  // rect2.beginFill(0x1c1c1c);
  // rect2.drawRect(0, 0, 100, 100);
  // rect2.endFill();
  // rect2.x = 400;
  // rect2.y = 100;
  // gameScene.addChild(rect2);



  // healthBar = new Container();
  
  // healthBar.position.set(app.stage.width - 170, 4)
  // gameScene.addChild(healthBar);

  // //Create the black background rectangle
  // let innerBar = new Graphics();
  // innerBar.beginFill(0x000000);
  // innerBar.drawRect(0, 0, 128, 8);
  // innerBar.endFill();
  // healthBar.addChild(innerBar);

  // let outerBar = new Graphics();
  // outerBar.beginFill(0xFF3300);
  // outerBar.drawRect(0, 0, 128, 8);
  // outerBar.endFill();
  // healthBar.addChild(outerBar);
  // healthBar.outer = outerBar;


  // gameOverScene = new Container();
  // app.stage.addChild(gameOverScene);
  // gameOverScene.visible = false;

  // let style = new TextStyle({
  //     fontFamily: 'Inconsolata',
  //     fontSize: 64,
  //     fill: 'white'
  //   });
  // message = new Text('The End!', style);
  // message.anchor.set(0.5);
  // message.x = app.stage.width / 2;
  // message.y = app.stage.height / 2;
  // gameOverScene.addChild(message);


  // export default class ActiveGameObject extends Container {

  //   constructor(texture, x, y, _x = 0, _y = 0, activeZone = null) {
  //     super();
  //     this.texture = new Sprite(texture);
  //     this.addChild(this.texture);
  //     this.position.set(x, y);
  //     this.x = x;
  //     this.y = y;
  //     this._x = _x;
  //     this._y = _y;
  //     this.activeZone = activeZone;
  //     this.zone = this.setActiveZone() || null;
  
  //   }
  //   objCollider() {
  //     if (this.activeZone) {
  //       return {
  //         x: this.x + this._x / 2,
  //         y: this.y + this._y / 2,
  //         width: this.texture.width - this._x,
  //         height: this.texture.height - this._y,
  //       }
  //     }
  //     return {
  //       x: this.x + this._x / 2,
  //       y: this.y + this._y / 2,
  //       width: this.width - this._x,
  //       height: this.height - this._y,
  //     }
  //   }
  //   setActiveZone() {
  //     if (this.activeZone) {
  //       const {x, y, w, h} = this.activeZone;
  //       const rectangle = new Graphics();
  //       rectangle.lineStyle(2, 0xFF3300, 1);
  //       // rectangle.beginFill(0x000000);
  //       // rectangle.visible = false;
  //       rectangle.drawRect(0, 0, w, h);
  //       rectangle.endFill();
  //       rectangle.x = x;
  //       rectangle.y = y;
  //       rectangle._x = rectangle.x + this.x;
  //       rectangle._y = rectangle.y + this.y;
  //       this.addChild(rectangle);
  //       return rectangle;
  //     }
  //   }
  //   zoneCollider() {
  //     return {
  //       x: this.zone._x,
  //       y: this.zone._y,
  //       width: this.zone.width,
  //       height: this.zone.height,
  //       active: true,
  //     }
  //   }
  // }










  import './scss/index.scss';

import {Application, Container, Graphics, Sprite, Text, TextStyle} from 'pixi.js';
import { contain, hitTestRectangle, randomInt } from './utils/utils';
import Player from './engine/Player';
import Bot from './engine/Bot';
import Level from './engine/Level';
import GameObject from './engine/GameObject';
import ActiveGameObject from './engine/ActiveGameObject';
import ChangerLevels from './engine/ChangerLevels';


let app = new Application({ 
  width: 600, 
  height: 600,                       
  transparent: false, 
});

document.body.append(app.view);
app.loader
  .add('spritesheet','treasureHunter.json')
  .add('roboSprite','RoboSprite.png')
  .add('scene','s01.png')
  .add('room1','1.png')
  .add('room2','2.png')
  .add('com','compSprite.png')
  .add('cyl','cyl2.png')
  .add('conv','conv.png')
  .load(setup);


let state, message, gameScene, gameOverScene, gameScene2, changerLevels, id, rectangle, rect2, character, bot1, character2,  scene, level1;

let com, com2, cyl, cyl2, conv;

function setup() {

  character = new Player(app.loader.resources['roboSprite'].url);
  gameScene = new Level(app.loader.resources['room1'].texture, character, 1);
  app.stage.addChild(gameScene);
  
  console.log(gameScene);

  gameScene2 = new Level(app.loader.resources['room2'].texture);
  gameScene2.visible = false;
  app.stage.addChild(gameScene2);

  id = app.loader.resources['spritesheet'].textures;


  // bot1 = new Bot(app.loader.resources['roboSprite'].url);
  // gameScene.addChild(bot1.bot);
  // bot1.bot.play();

  
  // gameScene.addChild(character.player);

  changerLevels = new ChangerLevels(100, 100, 400, 400, {out: gameScene, in: gameScene2}, character);
  gameScene.addChild(changerLevels);
  
  const comBaseAnimationState = ActiveGameObject.getBaseAnimationState(74, 76 , [{name: 'off', pattern: [0,0]}, {name: 'on', pattern: [[1,0], [0,0]]}]);
  com = new ActiveGameObject(app.loader.resources['com'].url, 74, 76, comBaseAnimationState, 200, 100, 0, 0, {
    x: 0,
    y: 80,
    w: app.loader.resources['com'].texture.width / 2,
    h: 40
  });
  gameScene.addChild(com);
  character.addColideObject(com.objCollider());
  
  com2 = new ActiveGameObject(app.loader.resources['com'].url, 74, 76, comBaseAnimationState, 400, 100, 0, 0, {
    x: 0,
    y: 80,
    w: app.loader.resources['com'].texture.width / 2,
    h: 40
  });
  gameScene.addChild(com2);
  character.addColideObject(com2.objCollider());

  character.addActiveObject(com.zoneCollider());
  character.addActiveObject(com2.zoneCollider());
  character.addActiveObject(changerLevels.zoneCollider());

  cyl = new GameObject(app.loader.resources['cyl'].texture, 240, 400);
  gameScene.addChild(cyl);
  character.addColideObject(cyl);

  // cyl2 = new GameObject(app.loader.resources['cyl'].texture, 400, 400);
  // gameScene.addChild(cyl2);

  // conv = new GameObject(app.loader.resources['conv'].texture, 30, 460, 0, 42);
  // gameScene.addChild(conv);
  
  state = play;
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  state(delta);
}

function play(delta) {
  //move
  character.player.x += character.player.vx;
  character.player.y += character.player.vy;
  //move
  // bot1.bot.x +=  bot1.bot.vx;
  // bot1.bot.y +=  bot1.bot.vy;

  
  //Contain the explorer inside the area of the room

  contain(character.player, {x: 28, y: 10, width: 572, height: 560});

  // let bot1Dir = contain(bot1.bot, {x: 28, y: 10, width: 572, height: 560});

  // if (bot1Dir === "left" || bot1Dir === "right") {
  //   bot1.bot.vx *= -1;
  //   bot1.botDirectionX();
  // }

  // if(hitTestRectangle(character.player, rect2)) {
  //   console.log('rect2');
  // }
  // character.objectCollider(cyl);
  // character.objectCollider(cyl2);

  character.objectCollider();
  // character.objectCollider(com2.objCollider());
  
  character.activeZoneCollider();
  // character.activeZoneCollider(com.zoneCollider());

  // character.objectCollider(conv.objCollider());
  // character.objectCollider(bot1.bot);

  // bot1.botObjectColliderX(character.player);
  // bot1.botObjectColliderX(cyl2);
  // bot1.botWallColliderX(rectangle);
 
}

function end() {
  gameScene.visible = false;
  gameOverScene.visible = true;
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
        console.log('enter');
        o.on();
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
  };
}
