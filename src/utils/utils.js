export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const contain = (sprite, container) => {
  // console.log(container.x);
  let collision = undefined;
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision = "right";
  }
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision = "bottom";
  }
  return collision;
} 

export const hitTestRectangle = (r1, r2) => {
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  hit = false;

  r1.centerX = r1.x + r1.width / 2; 
  r1.centerY = r1.y + r1.height / 2; 
  r2.centerX = r2.x + r2.width / 2; 
  r2.centerY = r2.y + r2.height / 2;

  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
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