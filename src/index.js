import './scss/index.scss';

import {Application, Sprite} from 'pixi.js';
import Player from './engine/Player';
import Level from './engine/Level';
import GameObject from './engine/GameObject';
import ActiveGameObject from './engine/ActiveGameObject';
import Keyboard from './engine/Keyboard';
import PhysicsGameObject from './engine/PhysicsGameObject';


let app = new Application({ 
  width: 600, 
  height: 600,                       
  transparent: false, 
});

document.body.append(app.view);

// app.loader.baseUrl = './img';

app.loader
  .add('roboSprite','RoboSprite.png')
  .add('scene','s01.png')
  .add('room1','202.png')
  .add('room2','2.png')
  .add('room3','3.png')
  .add('grid','0_.png')
  .add('com','compSprite.png')
  .add('cyl','cyl2.png')
  .add('conv','conv.png')
  .add('box','box.png')
  .load(setup);


let state, gameScene, gameOverScene;

let com, com2, cyl, conv, box, box2, box3;

let character, level1, level2, level3, grid;

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

  cyl = new GameObject(app.loader.resources['cyl'].texture, 300, 400);
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


  box = new PhysicsGameObject('box1', app.loader.resources['box'].texture, '1', 240, 300, -10, -10);
  box.addContainLevel('1', {x: 28, y: 20, width: 572, height: 560});
  box2 = new PhysicsGameObject('box2', app.loader.resources['box'].texture, '1', 200, 300, -10, -10);
  box2.addContainLevel('1', {x: 28, y: 20, width: 572, height: 560});
  box3 = new PhysicsGameObject('box3', app.loader.resources['box'].texture, '1', 400, 300, -10, -10);
  box3.addContainLevel('1', {x: 28, y: 20, width: 572, height: 560});
  
  level1.addStaticObject('box', box);
  level1.addStaticObject('box2', box2);
  level1.addStaticObject('box3', box3);
  
  level1.addLevelChanger('onLevel2', level2, {w: 30, h: 100, x: 526, y: 258}, character, {x: 30, y: 265});

  const initTakenObjects = () => {
    box2.addCollideObjects(character.colideObjects);
    box3.addCollideObjects(character.colideObjects);
    box.addCollideObjects(character.colideObjects);
    
    character.addActiveObject(box2.addActiveZone(character));
    character.addActiveObject(box.addActiveZone(character));
    character.addActiveObject(box3.addActiveZone(character));
  }
  level1.addFn(initTakenObjects);
  level1.initLevel();
  character.setActiveLevel(level1);

  level1.sortChildren();

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
  
  character.move();

  
  character.containLevel();
  character.objectCollider();
  character.activeZoneCollider();
  box.objectCollided();
  box.containLevel();
  box2.objectCollided();
  box2.containLevel();
  box3.objectCollided();
  box3.containLevel();

  box2.taken(character);
  box.taken(character);
  box3.taken(character);

}

function end() {
  gameScene.visible = false;
  gameOverScene.visible = true;
}


