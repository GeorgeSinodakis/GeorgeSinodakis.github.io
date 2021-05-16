let terms = 100;
let log_length = 800;
let angles = new Array(terms);
let dangles = new Array(terms);
let lengths = new Array(terms);
let logs = new Array(log_length);
let lastx, lasty;

function setup() {
	createCanvas(1300, 500);
	angleMode(DEGREES);
	for (var i = 0; i < terms; i++) {
		angles[i] = i;
		dangles[i] = i % 5;
		lengths[i] = 245 / terms;
		//lengths[i] = 2;
	}
}

function draw() {
	background(30);
	noFill();
	stroke(255);

	push();
	translate(width - log_length, height / 2);
	for (var i = 0; i < log_length; i++) {
		line(i, logs[i], i + 1, logs[i + 1]);
	}
	pop();

	translate(250, height / 2);
	lastx = 0;
	lasty = 0;
	for (var i = 0; i < terms; i++) {

		line(lastx, lasty, lastx + lengths[i] * cos(angles[i]), lasty + lengths[i] * sin(angles[i]));
		lastx += lengths[i] * cos(angles[i]);
		lasty += lengths[i] * sin(angles[i]);
		if (angles[i] + dangles[i] < 360) angles[i] += dangles[i];
		else angles[i] = 0;
	}

	logs.pop();
	logs.unshift(lasty);

}