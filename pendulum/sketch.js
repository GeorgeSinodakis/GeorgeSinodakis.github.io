let l1 = 100;
let l2 = 100;

let x1 = 0;
let y1 = 0;

let x2 = 0;
let y2 = 0;

let m1 = 10;
let m2 = 10;

let g = 9.8;

let a1;
let a2;

let w1;
let w2;

let nom;
let den;

function setup() {
	createCanvas(500, 500);
	angleMode(RADIANS);
	a1 = PI / 2;
	a2 = PI / 2;
	w1 = 0;
	w2 = 0;
}
let a = 0;

function draw() {
	background(50);
	stroke(255, 255, 255);
	fill(0, 0, 255);
	translate(width / 2, height / 2);

	x1 = l1 * sin(a1);
	y1 = l1 * cos(a1);
	x2 = x1 + l2 * sin(a2);
	y2 = y1 + l2 * cos(a2);

	line(0, 0, x1, y1);
	line(x1, y1, x2, y2);
	circle(x1, y1, 10);
	circle(x2, y2, 10);

	if (a == 4) {
		nom = -g * (2 * m1 + m2) * sin(a1) - m2 * g * sin(a1 - 2 * a2) - 2 * sin(a1 - a2) * m2 * (w2 * w2 * l2 + w1 * w1 * l1 * cos(a1 - a2));
		den = l1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
		w1 += ((nom) / den);

		nom = 2 * sin(a1 - a2) * (w1 * w1 * l1 * (m1 + m2) + g * (m1 + m2) * cos(a1) + w2 * w2 * l2 * m2 * cos(a1 - a2));
		den = l2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
		w2 += ((nom) / den);

		a1 += w1;
		a2 += w2;
		a = 0;
	} else a++;
}
