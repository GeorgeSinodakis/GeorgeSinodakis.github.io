let dim = 30;

class ball {
	constructor(x, y) {
		this.px = x;
		this.py = y;
		this.sx = 0;
		this.sy = 0;
		this.ax = 0;
		this.ay = 0;
		this.d = dim;
		this.r = random(0, 255);
		this.g = random(0, 255);
		this.b = random(0, 255);
	}
	setbounds() {
		if (this.px <= this.d / 2) {
			this.px = this.d / 2;
			this.sx *= -1;
		}
		if (this.px >= width - this.d / 2) {
			this.px = width - this.d / 2;
			this.sx *= -1;
		}
		if (this.py <= this.d / 2) {
			this.py = this.d / 2;
			this.sy *= -1;
		}
		if (this.py >= height - this.d / 2) {
			this.py = height - this.d / 2;
			this.sy *= -1;
		}
	}
	collision(b) {
		let distance = Math.sqrt(pow(this.px - b.px, 2) + pow(this.py - b.py, 2));
		let sr = this.d / 2 + b.d / 2;
		if (distance <= sr) {
			let angle = atan2(this.py - b.py, this.px - b.px);
			//speed
			let u1xi = this.sx * cos(angle) + this.sy * sin(angle);
			let u1y = -this.sx * sin(angle) + this.sy * cos(angle);
			let u2xi = b.sx * cos(angle) + b.sy * sin(angle);
			let u2y = -b.sx * sin(angle) + b.sy * cos(angle);
			let u1xf = ((this.d - b.d) * u1xi + 2 * b.d * u2xi) / (this.d + b.d);
			let u2xf = ((b.d - this.d) * u2xi + 2 * this.d * u1xi) / (this.d + b.d);
			this.sx = u1xf * cos(angle) - u1y * sin(angle);
			this.sy = u1xf * sin(angle) + u1y * cos(angle);
			b.sx = u2xf * cos(angle) - u2y * sin(angle);
			b.sy = u2xf * sin(angle) + u2y * cos(angle);
			//position
			let overlap = dim - sqrt(pow(this.px - b.px, 2) + pow(this.py - b.py, 2));
			let p1xi = this.px * cos(angle) + this.py * sin(angle);
			let p1yi = -this.px * sin(angle) + this.py * cos(angle);
			let p2xi = b.px * cos(angle) + b.py * sin(angle);
			let p2yi = -b.px * sin(angle) + b.py * cos(angle);
			if (p1xi < p2xi) {
				p1xi -= overlap / 2;
				p2xi += overlap / 2;
			} else {
				p1xi += overlap / 2;
				p2xi -= overlap / 2;
			}
			this.px = p1xi * cos(angle) - p1yi * sin(angle);
			this.py = p1xi * sin(angle) + p1yi * cos(angle);
			b.px = p2xi * cos(angle) - p2yi * sin(angle);
			b.py = p2xi * sin(angle) + p2yi * cos(angle);
		}
	}
	update() {
		this.sx *= 0.99;
		this.sy *= 0.99;
		//this.sx += this.ax;
		//this.sy += this.ay;
		this.px += this.sx;
		this.py += this.sy;
		if (abs(this.sx) < 0.1) this.sx = 0;
		if (abs(this.sy) < 0.1) this.sy = 0;
	}
}
