class Turret {
  constructor(img, width, canvas) {
    this.frame = 0;
    this.img = img;
    this.w = width;
    this.canvas = canvas;
    this.pos = {
      x: (canvas.width - this.w) * 0.5,
      y: (canvas.width - this.w) * 0.5,
    };
    this.health = 250;
    this.hp = this.health;
    // this.pos = { x: 100, y: 200 };
    this.middle = { x: this.pos.x + 32, y: this.pos.y + 32 };
    this.c = canvas.getContext("2d");
  }

  damage(hit, crit) {
    let multiplier = crit ? 2 : 1;
    this.hp -= hit * multiplier;
    if (this.hp < 0) return true;
    return false;
  }

  draw() {
    let f = Math.abs(this.frame);
    this.c.drawImage(
      this.img,
      f * this.w,
      0,
      this.w,
      this.w,
      this.pos.x,
      this.pos.y,
      this.w,
      this.w
    );
  }

  setRot(quart, deg) {
    switch (quart) {
      case -1:
        this.frame = Math.floor(deg / 20);
        break;
      case -2:
        this.frame = 8 - Math.floor(deg / 20);
        break;
      case 2:
        this.frame = 8 + Math.floor(deg / 20);
        break;
      case 1:
        if (deg > 80) this.frame = 12;
        // else this.frame = 16 - Math.ceil(deg/20)
        else this.frame = 15 - Math.floor(deg / 20);
        break;
    }
  }

  move(newX, newY) {
    this.pos.x += newX;
    this.pos.y += newY;

    this.middle.x = this.pos.x + 32;
    this.middle.y = this.pos.y + 32;
  }
}

export default Turret;
