let a = new Array(10);
let chosen = -1;
let mx = 0;
let my = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(RADIANS);
	for (let i = 0; i < a.length; i++) {
		let flag = false;
		let x;
		let y;
		while (!flag) {
			flag = true;
			x = random(dim / 2, width - dim / 2);
			y = random(dim / 2, height - dim / 2);
			for (let k = 0; k < i; k++) {
				if (sqrt(pow(a[k].px - x, 2) + pow(a[k].py - y, 2)) <= dim + 1) flag = false;
			}
		}
		a[i] = new ball(x, y);
	}
	a[0].r = 255;
	a[0].g = 255;
	a[0].b = 255;
}

function draw() {
	background(0, 200, 0);

	drawballs();
	updateballs();

}

function drawballs() {
	//steka
	strokeWeight(3);
	let angle = atan2(mouseY - a[0].py, mouseX - a[0].px);
	let amp = sqrt(pow(mouseY - a[0].py, 2) + pow(mouseX - a[0].px, 2));
	let dif = sqrt(pow(mouseX - a[0].px, 2) + pow(mouseY - a[0].py, 2)) - sqrt(pow(a[0].px - mx, 2) + pow(a[0].py - my, 2));
	if (abs(a[0].sx) < 0.01 && abs(a[0].sy) < 0.01) {
		if (chosen == 1) {
			line(a[0].px + (dim / 2 + dif + 10) * cos(angle), a[0].py + (dim / 2 + dif + 10) * sin(angle), a[0].px + (dim / 2 + dif + 100) * cos(angle), a[0].py + (dim / 2 + dif + 100) * sin(angle));
		} else {
			line(a[0].px + (dim / 2 + 10) * cos(angle), a[0].py + (dim / 2 + 10) * sin(angle), (dim / 2 + 100) * cos(angle) + a[0].px, (dim / 2 + 100) * sin(angle) + a[0].py);
		}
		//projection ball
		strokeWeight(1);
		let dis = 0;
		let x;
		let y;
		let found = false;
		while (!found) {
			dis++;
			x = a[0].px - dis * cos(angle);
			y = a[0].py - dis * sin(angle);
			if (x < dim / 2) found = true;
			if (x > width - dim / 2) found = true;
			if (y < dim / 2) found = true;
			if (y > height - dim / 2) found = true;
			for (let i = 1; i < a.length; i++) {
				if (sqrt(pow(x - a[i].px, 2) + pow(y - a[i].py, 2)) < dim) found = true;
			}
		}
		fill(200, 200, 200, 200);
		strokeWeight(1);
		circle(x, y, dim);
		line(sin(angle-PI/2) * dim / 2 + a[0].px, cos(angle-PI/2) * dim / 2 + a[0].py, sin(angle-PI/2) * dim / 2 + x, cos(angle-PI/2) * dim / 2 + y);
	}
	//balls
	for (let i = 0; i < a.length; i++) {
		strokeWeight(1);
		fill(a[i].r, a[i].g, a[i].b);
		circle(a[i].px, a[i].py, a[i].d);
	}
}

function updateballs() {
	for (let i = 0; i < a.length; i++) {
		a[i].update();
		for (let k = 0; k < a.length; k++) {
			if (i != k) a[i].collision(a[k]);
		}
		a[i].setbounds();
	}
}

function mousePressed() {
	mx = mouseX;
	my = mouseY;
	chosen = 1;
}

function mouseReleased() {
	let angle = atan2(mouseY - a[0].py, mouseX - a[0].px);
	let dif = sqrt(pow(mouseX - a[0].px, 2) + pow(mouseY - a[0].py, 2)) - sqrt(pow(a[0].px - mx, 2) + pow(a[0].py - my, 2));
	a[0].sx = -dif * cos(angle) * 0.1;
	a[0].sy = -dif * sin(angle) * 0.1;
	chosen = -1;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
