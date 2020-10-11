import { AnimatedSprite, BaseTexture, Rectangle, Texture } from "pixi.js";

export default class Bot {
  constructor(texture) {
    this.texture = texture;
    this.botSheet = {};
    this.createBotSheet();
    this.botDirection = 'East';

    this.bot = new AnimatedSprite(this.botSheet.walkEast);
    this.initBot();

  }
  initBot() {
    // this.bot.anchor.set(0.5);
    this.bot.animationSpeed = 0.1;
    this.bot.loop = true;
    this.bot.x = 20;
    this.bot.y = 400;
    this.bot.vx = 2;
    this.bot.vy = 0;
    this.bot.play();
  }
  
  createBotSheet() {
    let sheet = new BaseTexture.from(this.texture);
    let w = 50;
    let h = 60;
    this.botSheet['standSouth'] = [
      new Texture(sheet, new Rectangle(0 * w, 3 * h, w, h)),
    ];
    this.botSheet['walkSouth'] = [
      
      new Texture(sheet, new Rectangle(1 * w, 3 * h, w, h)),
      new Texture(sheet, new Rectangle(2 * w, 3 * h, w, h)),
      new Texture(sheet, new Rectangle(3 * w, 3 * h, w, h)),
      new Texture(sheet, new Rectangle(4 * w, 3 * h, w, h)),
      new Texture(sheet, new Rectangle(5 * w, 3 * h, w, h)),
      new Texture(sheet, new Rectangle(6 * w, 3 * h, w, h)),
      new Texture(sheet, new Rectangle(7 * w, 3 * h, w, h)),
      new Texture(sheet, new Rectangle(0 * w, 3 * h, w, h)),
    ];
    this.botSheet['standWest'] = [
      new Texture(sheet, new Rectangle(0 * w, 1 * h, w, h)),
    ];
    this.botSheet['walkWest'] = [
      
      new Texture(sheet, new Rectangle(1 * w, 1 * h, w, h)),
      new Texture(sheet, new Rectangle(2 * w, 1 * h, w, h)),
      new Texture(sheet, new Rectangle(3 * w, 1 * h, w, h)),
      new Texture(sheet, new Rectangle(4 * w, 1 * h, w, h)),
      new Texture(sheet, new Rectangle(5 * w, 1 * h, w, h)),
      new Texture(sheet, new Rectangle(6 * w, 1 * h, w, h)),
      new Texture(sheet, new Rectangle(7 * w, 1 * h, w, h)),
      new Texture(sheet, new Rectangle(0 * w, 1 * h, w, h)),
    ];
    this.botSheet['standEast'] = [
      new Texture(sheet, new Rectangle(0 * w, 0 * h, w, h)),
    ];
    this.botSheet['walkEast'] = [
      
      new Texture(sheet, new Rectangle(1 * w, 0 * h, w, h)),
      new Texture(sheet, new Rectangle(2 * w, 0 * h, w, h)),
      new Texture(sheet, new Rectangle(3 * w, 0 * h, w, h)),
      new Texture(sheet, new Rectangle(4 * w, 0 * h, w, h)),
      new Texture(sheet, new Rectangle(5 * w, 0 * h, w, h)),
      new Texture(sheet, new Rectangle(6 * w, 0 * h, w, h)),
      new Texture(sheet, new Rectangle(7 * w, 0 * h, w, h)),
      new Texture(sheet, new Rectangle(0 * w, 0 * h, w, h)),
    ];
    this.botSheet['standNorth'] = [
      new Texture(sheet, new Rectangle(0 * w, 2 * h, w, h)),
    ];
    this.botSheet['walkNorth'] = [
      
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
  botObjectColliderX(obj) {
    if(this.botCollider(this.bot, obj)) {
      this.bot.vx *= -1;
      this.botDirectionX();
    }
  }
  botDirectionX() {
    this.bot.stop();
    this.botDirection === 'East' ? this.botDirection = 'West': this.botDirection = 'East';
    this.bot.textures = this.botSheet[`walk${this.botDirection}`];
    this.bot.play();
  }
  botCollider = (r1, r2) => {
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
}

