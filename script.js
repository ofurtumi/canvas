const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let rotate = 0;
let bullets = new Array();

function draw(rot = 0) {
	c.fillStyle = '#fff';
	c.fillRect(0, 0, 500, 500);
	c.fillStyle = '#000';

	c.translate(250, 250);
	c.rotate((rot * 5 * Math.PI) / 180);
	c.translate(-250, -250);

	c.fillRect(225, 225, 50, 50);
	c.fillStyle = '#fff';
	c.fillRect(250, 249, 25, 2);
}

function animate() {
	let deletable = [];

	draw(rotate);
	for (let i = 0; i < bullets.length; i++) {
		const b = bullets[i];
		b.shoot();
		if (b.pos.x >= 495) deletable.push(i);
	}

	deletable.forEach((b) => {
		bullets.splice(b, 1);
	});

	requestAnimationFrame(animate);
}
animate();
draw();

class bullet {
	constructor(x, y, r, vel = 10) {
		this.initial = { x, y, r };
		this.pos = { x, y };
		this.rot = r;
		this.vel = vel;
	}

	shoot() {
		// c.rotate()
		this.pos.x += this.vel;
		c.fillStyle = '#000';
		c.fillRect(this.pos.x, this.pos.y, 10, 10);
	}
}

window.addEventListener('keydown', (e) => {
	switch (e.key) {
		case 'ArrowRight':
			rotate = 1;
			break;
		case 'ArrowLeft':
			rotate = -1;
			break;
		case ' ':
			if (!e.repeat) {
				bullets.push(new bullet(245, 245, 0));
				draw();
			}
		default:
			break;
	}
});

window.addEventListener('keyup', (e) => {
	switch (e.key) {
		case 'ArrowRight':
		case 'ArrowLeft':
			rotate = 0;
	}
});
