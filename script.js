import { Vector } from "./lib/vector.js";
import {setNav} from "./lib/utils.js"
import Turret from "./Turett.js";
import Bullet from "./Bullet.js";
import Enemy from "./Enemy.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const bulletCount = document.querySelector("#bulletCount");
const turretImg = new Image(1024, 64);
let m = { x: 1000, y: 250 };
const bullets = new Array();
const PMO = new Map(); // * Player Middle Offset, offset notað til að láta bullet skjótast frá réttum stað

const numEnemies = document.querySelector("#young");
let spawn = 0;
let remove = 0;

let keys = {
  up: false,
  down: false,
  left: false,
  right: false,
};

turretImg.src = "turret.png";

let player;
let enemy;
let enemies = new Array();

function getDeg(pX, pY, mX, mY) {
  const R = new Vector(mX - pX, 0);
  const P = new Vector(mX - pX, mY - pY);
  const delta = R.angleBetween(P);

  return delta;
}

function getVec(refPos, targetPos) {
  const x = targetPos.x - refPos.x;
  const y = targetPos.y - refPos.y;
  const magnitude = Math.sqrt(x * x + y * y);

  const dir = { x: x / magnitude, y: y / magnitude };

  return dir;
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

function isCollision(obj1, w1, obj2, w2) {
  //   console.log("obj1.pos --> ", obj1.pos);
  if (
    obj1.pos.x + w1 * 0.5 >= obj2.pos.x &&
    obj1.pos.x + w1 * 0.5 <= obj2.pos.x + w2 &&
    obj1.pos.y + w1 * 0.5 >= obj2.pos.y &&
    obj1.pos.y + w1 * 0.5 <= obj2.pos.y + w2
  ) {
    return true;
  }
  return false;
}

// * animation function - heldur utan um allar teikningar og læti
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // * sér um að ákvarða snúning á "byssunni" hjá player
  const deg = getDeg(player.middle.x, player.middle.y, m.x, m.y);
  let quart =
    (m.y > player.middle.y ? -1 : 1) * (m.x > player.middle.x ? 1 : 2);
  if (deg) player.setRot(quart, deg);

  // * movement fyrir player
  const xMov = (keys.left ? -5 : 0) + (keys.right ? 5 : 0);
  const yMov = (keys.up ? -5 : 0) + (keys.down ? 5 : 0);
  player.move(xMov, yMov);

  // * ef það eru kúlur á skjánum, uppfærir teljarann og eyðir þeim sem fara útaf
  if (bullets) {
    bulletCount.textContent = String(bullets.length);
    let OOBs = [];
    bullets.map((b, i) => {
      b.draw();
      if (b.OOB) OOBs.push(i); // ? OOB er out of bounds
      else {
        enemies.forEach((enemy) => {
          if (isCollision(b, b.w, enemy, enemy.w)) {
            OOBs.push(i);
            enemy.hit(b);
          }
        });
      }
    });

    if (OOBs.length > 0) {
      OOBs.map((oob) => {
        bullets.splice(oob, 1);
      });
    }
  }

  enemies.forEach(enemy => {
    if (enemy.hp <= 0) {
      enemy.pos.x = 250;
      enemy.pos.y = 700;
      enemy.hp = enemy.health;
    }
  })

  player.draw();
  enemies.forEach((enemy) => {
    enemy.newPos(getVec(enemy.pos, enemy.target.pos));
    enemy.draw();
  });
  // ctx.stroke()

  // ? sér um að fæða nýja enemies ef svo á við
  if (spawn > 0) {
    for (let i = 0; i < spawn; i++) {
      let size = Math.floor(Math.random()*24+16);
      enemies.push(new Enemy(player, {x: 500, y: 500}, size*3, canvas, size))
    }
    spawn = 0;
  }

  // ? sér um að fjarlægja nýja enemies ef svo á við
  if (remove > 0) {
    for (let i = 0; i < remove; i++) {
      enemies.pop();
    }
    remove = 0;
  }

  if (enemies.length !== Number(numEnemies.textContent)) {
    numEnemies.textContent = enemies.length
  }

  window.requestAnimationFrame(animate);
}

// * setup function startar evenet listenerum og ehv data types
window.onload = async function () {
  // ! smá leyni :Z
  if (window.location.hostname === "sjomli.is") {
    setNav();
  }

  player = new Turret(turretImg, 64, canvas);
  enemies[0] = new Enemy(player, { x: 100, y: 100 }, 100, canvas);
  player.draw();
  enemies.forEach((enemy) => {
    enemy.draw();
  });

  // todo: setja þetta í json eða ehv sheesh þetta er ógeð
  PMO.set(0, { PMX: 25, PMY: 0 });
  PMO.set(1, { PMX: 20, PMY: 10 });
  PMO.set(2, { PMX: 15, PMY: 15 });
  PMO.set(3, { PMX: 10, PMY: 20 });
  PMO.set(4, { PMX: 0, PMY: 25 });
  PMO.set(5, { PMX: -10, PMY: 20 });
  PMO.set(6, { PMX: -15, PMY: 15 });
  PMO.set(7, { PMX: -20, PMY: 10 });
  PMO.set(8, { PMX: -25, PMY: 0 });
  PMO.set(9, { PMX: -20, PMY: -10 });
  PMO.set(10, { PMX: -15, PMY: -15 });
  PMO.set(11, { PMX: -10, PMY: -20 });
  PMO.set(12, { PMX: 0, PMY: -25 });
  PMO.set(13, { PMX: 10, PMY: -20 });
  PMO.set(14, { PMX: 15, PMY: -15 });
  PMO.set(15, { PMX: 20, PMY: -10 });

  // * sér um snúning á sprite útfrá músinni
  canvas.addEventListener("mousemove", (e) => {
    m = getMousePos(canvas, e);
    const deg = getDeg(player.middle.x, player.middle.y, m.x, m.y);
    let quart =
      (m.y > player.middle.y ? -1 : 1) * (m.x > player.middle.x ? 1 : 2);
    if (deg) player.setRot(quart, deg);
  });

  // * sér um að velja punkt til að skjóta frá og búa til bullet
  canvas.addEventListener("click", (e) => {
    const mousePos = getMousePos(canvas, e);
    let dir = getVec(player.middle, { x: mousePos.x - 5, y: mousePos.y - 5 });
    let { PMX, PMY } = PMO.get(player.frame);
    let b = new Bullet(
      { x: player.middle.x + PMX - 5, y: player.middle.y + PMY - 5 },
      dir,
      canvas,
      Math.random() < 0.8 ? 5 : 25
    );
    bullets.push(b);
  });

  // * tveir movement event listenar
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "a":
        keys.left = true;
        break;
      case "d":
        keys.right = true;
        break;
      case "w":
        keys.up = true;
        break;
      case "s":
        keys.down = true;
        break;
    }
  });
  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "a":
        keys.left = false;
        break;
      case "d":
        keys.right = false;
        break;
      case "w":
        keys.up = false;
        break;
      case "s":
        keys.down = false;
        break;
    }
  });

  document.querySelector("#kill").addEventListener("click", () => {
    remove++;
  })
  document.querySelector("#spawn").addEventListener("click", () => {
    spawn++;
  })

  animate();
};
