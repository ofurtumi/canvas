class Bullet {
  constructor(pos, dir, canvas, damage, w = 10) {
    this.pos = pos;
    this.dir = dir;
    this.canvas = canvas;
    this.c = canvas.getContext("2d");
    this.OOB = false; // ? out of bounds
    this.damage = damage;
    this.color = damage === 5 ? "#000" : "#f00";
    this.w = w;
  }

  draw() {
    this.newPos();
    this.c.fillStyle = this.color;
    this.c.fillRect(this.pos.x, this.pos.y, 10, 10);
  }

  newPos() {
    this.pos.x += this.dir.x * 10;
    this.pos.y += this.dir.y * 10;

    if (
      this.pos.x < 0 ||
      this.pos.y < 0 ||
      this.pos.x > this.canvas.width ||
      this.pos.y > this.canvas.height
    )
      this.OOB = true;
  }
}

export default Bullet;
