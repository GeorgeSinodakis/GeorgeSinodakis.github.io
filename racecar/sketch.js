let divs = new Array(2000).fill(0);
let gap;
let pad;
let index = 0;
let car_width = 50;
let car_height = 90;
let car_offset;

function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	for (index; index < divs.length; index++) divs[index] = (width - gap - pad) * sin(index * 360 / 1000) / 2 + (width - gap - pad) / 2 + pad / 2;
	car_offset = (windowWidth - car_width) / 2;
}

function draw() {
	background(50);
	gap = windowWidth * 0.34;
	pad = windowWidth * 0.034;
	stroke(0, 0, 255);
	for (var i = 0; i < windowHeight; i++) {
		line(0, i, divs[i], i);
		line(divs[i] + gap, i, width - 1, i);
	}
	fill(225, 235, 52);
	rect(car_offset, (height - car_height) / 2, car_width, car_height);

	if (keyIsDown(LEFT_ARROW)) car_offset -= width / 200;
	if (keyIsDown(RIGHT_ARROW)) car_offset += width / 200;
	if (mouseIsPressed && mouseX < 0.3 * width) car_offset -= width / 200;
	if (mouseIsPressed && mouseX > 0.7 * width) car_offset += width / 200;

	divs.pop();
	divs.unshift((width - gap - pad) * sin(index++ * 360 / 1000) / 2 + (width - gap - pad) / 2 + pad / 2);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}