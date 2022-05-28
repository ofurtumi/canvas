class Enemy {
  constructor(target, pos, hp, canvas, w = 32) {
    this.target = target;
    this.pos = pos;
    this.w = w;
    this.health = hp;
    this.hp = hp;
    this.canvas = canvas;
    this.damaged = false;
    this.crit = 0;
    this.c = canvas.getContext("2d");
  }

  draw() {
    this.c.fillStyle = this.damaged ? "#f00" : "#000";
    this.damaged ? (this.damaged = false) : null;
    this.c.fillRect(this.pos.x, this.pos.y, this.w, this.w);
    this.c.fillText(
      this.hp + "/" + this.health,
      this.pos.x - 4,
      this.pos.y + 50
    );

    this.c.fillStyle = "rgba(255,0,0,"+0.1*this.crit-- +")"
    this.c.fillText(
        "CRITICAL",
        this.pos.x - 5,
        this.pos.y - 10
      );
  }

  newPos(vector) {
    this.pos.x += vector.x * 2;
    this.pos.y += vector.y * 2;
  }

  hit(bullet) {
    this.hp -= bullet.damage;
    if (bullet.damage != 5) this.crit = 20;
    this.damaged = 1;
  }
}

export default Enemy;
