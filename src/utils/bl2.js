import './scss/index.scss';

import {Application, Container, Graphics, Sprite, Text, TextStyle} from 'pixi.js';
import { contain, hitTestRectangle, randomInt } from './utils/utils';
import Player from './engine/Player';
import Bot from './engine/Bot';
import Level from './engine/Level';
import GameObject from './engine/GameObject';
import ActiveGameObject from './engine/ActiveGameObject';
import Keyboard from './engine/Keyboard';


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
  .add('room1','202.png')
  .add('room2','2.png')
  .add('room3','3.png')
  .add('grid','0_.png')
  .add('com','compSprite.png')
  .add('cyl','cyl2.png')
  .add('conv','conv.png')
  .load(setup);


let state, message, gameScene, gameOverScene, gameScene2, id, rectangle, rect2, bot1, character2,  scene;

let com, com2, cyl, cyl2, conv;

let character, level1, level2, level3, changerLevels, changerLevels2, grid;

function setup() {

  character = new Player(app.loader.resources['roboSprite'].url);

  level1 = new Level(app.loader.resources['room1'].texture, '1');
  character.addContainLevel('1', {x: 28, y: 20, width: 572, height: 560});
  level1.addPlayer(character);
  app.stage.addChild(level1);

  const comBaseAnimationState = ActiveGameObject.getBaseAnimationState(74, 76 , [{name: 'off', pattern: [0,0]}, {name: 'on', pattern: [[1,0], [0,0]]}]);
  com = new ActiveGameObject(app.loader.resources['com'].url, 74, 76, comBaseAnimationState, 200, 100, 0, 0, {
    x: 0,
    y: 80,
    w: app.loader.resources['com'].texture.width / 2,
    h: 40
  });
  level1.addActiveObject('com', com);
  
  com2 = new ActiveGameObject(app.loader.resources['com'].url, 74, 76, comBaseAnimationState, 400, 100, 0, 0, {
    x: 0,
    y: 80,
    w: app.loader.resources['com'].texture.width / 2,
    h: 40
  });
  level1.addActiveObject('com2', com2);

  cyl = new GameObject(app.loader.resources['cyl'].texture, 240, 400);
  level1.addStaticObject('cyl', cyl);
  

  level2 = new Level(app.loader.resources['room2'].texture, '2');
  character.addContainLevel('2', {x: 28, y: 20, width: 572, height: 560});
  app.stage.addChild(level2);

  level3 = new Level(app.loader.resources['room3'].texture, '3');
  character.addContainLevel('3', {x: 28, y: 20, width: 572, height: 560});
  app.stage.addChild(level3);
  level3.addLevelChanger('onLevel2', level2, {w: 30, h: 100, x: 38, y: 258}, character, {x: 526, y: 265});

  level2.addStaticObject('cyl', cyl);
  level2.addLevelChanger('onLevel1', level1, {w: 30, h: 100, x: 38, y: 258}, character, {x: 526, y: 265});
  level2.addLevelChanger('onLevel3', level3, {w: 30, h: 100, x: 526, y: 258}, character, {x: 30, y: 265});

  conv = new GameObject(app.loader.resources['conv'].texture, 30, 460, 0, 42);
  level2.addStaticObject('conv', conv);



  
  level1.addLevelChanger('onLevel2', level2, {w: 30, h: 100, x: 526, y: 258}, character, {x: 30, y: 265});
  level1.initLevel();

  

  id = app.loader.resources['spritesheet'].textures;


  // bot1 = new Bot(app.loader.resources['roboSprite'].url);
  // gameScene.addChild(bot1.bot);
  // bot1.bot.play();

  
  // gameScene.addChild(character.player);

  
  
  

  
  // character.addActiveObject(com2.zoneCollider());
  

  

  // cyl2 = new GameObject(app.loader.resources['cyl'].texture, 400, 400);
  // gameScene.addChild(cyl2);

  grid = new Sprite(app.loader.resources['grid'].texture);
  app.stage.addChild(grid);
  grid.visible = false;
  let gridToogle = new Keyboard(81);
  gridToogle.press = () => {
    grid.visible = !grid.visible;
  }
  
  state = play;
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  state(delta);
}

function play(delta) {
  //move
  // character.player.x += character.player.vx;
  // character.player.y += character.player.vy;
  character.move();
  //move
  // bot1.bot.x +=  bot1.bot.vx;
  // bot1.bot.y +=  bot1.bot.vy;

  
  //Contain the explorer inside the area of the room

  // contain(character.player, {x: 28, y: 10, width: 572, height: 560});

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
  character.containLevel();
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


