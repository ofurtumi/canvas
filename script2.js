import { Vector } from './lib/vector.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const turretImg = new Image(1024, 64);
let m = { x: 1000, y: 250 };

let keys = {
	up: false,
	down: false,
	left: false,
	right: false,
};

turretImg.src = 'turret.png';

let player;

class Turret {
	constructor(img, w) {
		this.frame = 0;
		this.img = img;
		this.w = w;
		this.pos = {
			x: (canvas.width - this.w) * 0.5,
			y: (canvas.width - this.w) * 0.5,
		};
		// this.pos = { x: 100, y: 200 };
		this.middle = { x: this.pos.x + 32, y: this.pos.y + 32 };
	}

	draw() {
		let f = Math.abs(this.frame);
		c.clearRect(0, 0, canvas.width, canvas.height);
		c.drawImage(
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
				player.frame = Math.floor(deg / 20);
				break;
			case -2:
				player.frame = 8 - Math.floor(deg / 20);
				break;
			case 2:
				player.frame = 8 + Math.floor(deg / 20);
				break;
			case 1:
				if (deg < 20) player.frame = 0;
				else player.frame = 16 - Math.floor(deg / 20);
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

window.onload = async function () {
	player = new Turret(turretImg, 64);
	player.draw();
	animate();
};

function getDeg(pX, pY, mX, mY) {
	const R = new Vector(mX - pX, 0);
	const P = new Vector(mX - pX, mY - pY);
	const delta = R.angleBetween(P);

	return delta;
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top,
	};
}

canvas.addEventListener('mousemove', (e) => {
	m = getMousePos(canvas, e);
	const deg = getDeg(player.middle.x, player.middle.y, m.x, m.y);
	let quart =
		(m.y > player.middle.y ? -1 : 1) * (m.x > player.middle.x ? 1 : 2);
	if (deg) player.setRot(quart, deg);
});

window.addEventListener('keydown', (e) => {
	switch (e.key) {
		case 'a':
			keys.left = true;
			break;
		case 'd':
			keys.right = true;
			break;
		case 'w':
			keys.up = true;
			break;
		case 's':
			keys.down = true;
			break;
	}
});

window.addEventListener('keyup', (e) => {
	switch (e.key) {
		case 'a':
			keys.left = false;
			break;
		case 'd':
			keys.right = false;
			break;
		case 'w':
			keys.up = false;
			break;
		case 's':
			keys.down = false;
			break;
	}
});

function animate() {
	const deg = getDeg(player.middle.x, player.middle.y, m.x, m.y);
	let quart =
		(m.y > player.middle.y ? -1 : 1) * (m.x > player.middle.x ? 1 : 2);
	if (deg) player.setRot(quart, deg);

	const xMov = (keys.left ? -5 : 0) + (keys.right ? 5 : 0);
	const yMov = (keys.up ? -5 : 0) + (keys.down ? 5 : 0);
	player.move(xMov,yMov)

	player.draw();
	window.requestAnimationFrame(animate);
}

// todo: bæta við bullet 
