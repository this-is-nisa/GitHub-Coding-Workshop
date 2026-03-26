const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- 1. ASSET MANAGER ---
let assetsLoaded = 0;
const totalAssets = 4;
const yoshiSprite = new Image();
const goombaSprite = new Image();
const brickSprite = new Image();
const questionSprite = new Image();

yoshiSprite.src = 'https://www.pngall.com/wp-content/uploads/11/Yoshi-PNG-Images.png';
goombaSprite.src = 'https://www.pngmart.com/files/23/Goomba-PNG-Photo.png';
brickSprite.src = 'https://freepngimg.com/thumb/brick/90535-mario-square-super-bros-brown-free-photo-png.png';
questionSprite.src = 'https://melonds.kuribo64.net/board/userpic/397_1573947385.png';

yoshiSprite.onload = goombaSprite.onload = brickSprite.onload = questionSprite.onload = checkAssetsLoaded;

function checkAssetsLoaded() {
  assetsLoaded++;
  if (assetsLoaded === totalAssets) {
    loadLevel(currentLevel);
    if (!gameRunning) update(); 
  }
}

// --- 2. GAME DATA ---
let score = 0;
let currentLevel = 0;
let gameRunning = false; 
const tileSize = 40;
const gravity = 0.6;

/**
 * CHALLENGE 1: THE ARCHITECT
 * Directions: Design Levels 3, 4, and 5.
 * 0 = Sky, 1 = Brick, 2 = [?], 3 = Goomba, 4 = Goal
 */
const levels = [
  [ // Level 1
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0,4],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ],
  [ // Level 2
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,2,0,0,0,2,2,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,3,0,0,0,3,0,0,0,0,0,3,0,0,0,4],
    [1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1]
  ],

  [ // Level 3
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,2,1,2,2,2,2,2,2,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0,4],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ],
  [ // Level 4
    [0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,2,0,0,0,2,2,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,3,0,0,0,3,0,0,0,0,0,3,0,0,0,4],
    [1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1]
  ],
   [ // Level 5
    [0,0,0,0,0,0,2,3,3,0,3,0,3,3,0,0,0,0,0,0],
    [0,0,0,0,2,2,2,1,1,2,2,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,3,3,0,0,2,0,0,0,0,0,3,0,0,0,4],
    [1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1]
  ],
  // TODO: Add Level 3, 4, and 5 here...
];

let player = { x: 50, y: 100, w: 35, h: 45, vX: 0, vY: 0, speed: 5, jump: 12, grounded: false, dead: false };
let platforms = [], enemies = [], goals = [];
const keys = {};

function getCollision(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function loadLevel(idx) {
  if(idx >= levels.length) {
    alert("YOU WIN!");
    currentLevel = 0; idx = 0; score = 0;
  }
  platforms = []; enemies = []; goals = [];
  player.dead = false;
  document.getElementById('overlay').style.display = 'none';

  /**
   * CHALLENGE 2: UI SYNCHRONIZATION
   * TODO: Update 'level-num' and 'score-num' in the HTML
   */

  const map = levels[idx];
  map.forEach((row, r) => {
    row.forEach((type, c) => {
      let x = c * tileSize, y = r * tileSize + 240;
      if (type === 1) platforms.push({ x, y, w: tileSize, h: tileSize, type: 'ground' });
      if (type === 2) platforms.push({ x, y, w: tileSize, h: tileSize, type: 'item' });
      if (type === 3) enemies.push({ x, y: y+10, w: 30, h: 30, speed: -1.5, alive: true });
      if (type === 4) goals.push({ x, y: y - 80, w: 40, h: 120 });
    });
  });
  player.x = 50; player.y = 100; player.vY = 0; player.vX = 0;
}

function update() {
  if (player.dead) { gameRunning = false; return; }
  gameRunning = true; 

  if (keys['ArrowRight'] || keys['KeyD']) player.vX = player.speed;
  else if (keys['ArrowLeft'] || keys['KeyA']) player.vX = -player.speed;
  else player.vX *= 0.8;

  player.vY += gravity;
  player.x += player.vX;
  player.y += player.vY;
  player.grounded = false;

  if (player.x < 0) {
    player.x = 0;
  }

  /**
   * CHALLENGE 3: WORLD BOUNDARIES (PITS)
   */
  if (player.y > canvas.height) {
    // TODO: Set player.dead and show overlay
  }

  platforms.forEach((p, i) => {
    if (getCollision(player, p)) {
      
      /**
       * CHALLENGE 4: THE SOLID WORLD
       * 1. Floor: Provided below.
       * 2. Head-Butt: If vY < 0 and player is below the block.
       * 3. Ghost Walls: Stop Yoshi, but allow his head to overlap the bottom of blocks.
       */

      // --- PART A: THE FLOOR (Given) ---
      if (player.vY > 0 && player.y + player.h < p.y + 20) {
        player.y = p.y - player.h - 0.1;
        player.vY = 0;
        player.grounded = true;
      }

      // --- PART B: THE HEAD-BUTT (Your Turn!) ---
      if (player.vY < 0 && player.y > p.y) {
        // TODO: Bounce down (vY = 2) and delete [?] blocks (splice)
      }
      
      // --- PART C: GHOST WALLS (Your Turn!) ---
      if (player.vX > 0 && player.x + player.w < p.x + 10 
          && player.y + player.h > p.y + 5) { // Feet buffer
        // TODO: Add the 'Ghost Head' check and stop Yoshi (vX = 0)
      } 
      else if (player.vX < 0 && player.x > p.x + p.w - 10 
          && player.y + player.h > p.y + 5) {
        // TODO: Add the 'Ghost Head' check and stop Yoshi (vX = 0)
      }
    }
  });

  if ((keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && player.grounded) {
    player.vY = -player.jump;
  }

  enemies.forEach(en => {
    if (!en.alive) return;
    en.x += en.speed;
    if (en.x < 0 || en.x > canvas.width - en.w) en.speed *= -1;

    if (getCollision(player, en)) {
      /**
       * CHALLENGE 5: STOMP OR DIE
       */
      // TODO: Logic for falling on top of enemy vs hitting from the side
    }
  });

  /**
   * CHALLENGE 6: THE NEXT LEVEL
   */
  goals.forEach(g => {
    // TODO: Collision check to advance levels
  });

  draw();
  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  platforms.forEach(p => {
    let img = p.type === 'item' ? questionSprite : brickSprite;
    ctx.drawImage(img, p.x, p.y, tileSize, tileSize);
  });
  enemies.forEach(en => { if (en.alive) ctx.drawImage(goombaSprite, en.x, en.y, en.w, en.h); });
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  goals.forEach(g => ctx.fillRect(g.x, g.y, g.w, g.h));
  ctx.save();
  if (player.vX < -0.1) {
    ctx.translate(player.x + player.w, player.y);
    ctx.scale(-1, 1);
    ctx.drawImage(yoshiSprite, 0, 0, player.w, player.h);
  } else {
    ctx.drawImage(yoshiSprite, player.x, player.y, player.w, player.h);
  }
  ctx.restore();
}

window.onkeydown = (e) => {
  keys[e.code] = true;
  if ((e.key === 'r' || e.key === 'R') && player.dead) {
    loadLevel(currentLevel);
    if (!gameRunning) update();
  }
};
window.onkeyup = (e) => keys[e.code] = false;
