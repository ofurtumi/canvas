class Enemy {
  constructor(target, pos, hp, canvas, w = 32) {
    this.target = target;
    this.pos = pos;
    this.w = w
    this.health = hp
    this.hp = hp;
    this.canvas = canvas;
    this.c = canvas.getContext("2d");
  }

  draw() {
    this.c.fillStyle = "#000";
    this.c.fillRect(this.pos.x, this.pos.y, this.w, this.w);
    this.c.fillText(this.hp+"/"+this.health, this.pos.x-4,this.pos.y+50)
  }

  newPos(vector) {
    this.pos.x += vector.x * 2;
    this.pos.y += vector.y * 2;
  }
}

export default Enemy;
