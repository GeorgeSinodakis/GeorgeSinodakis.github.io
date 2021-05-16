let game = new Array(9);
const b_s = 100;
const l_t = 3;
let header = document.getElementById("header");
let user = 0;
let pc = 0;
let counter = 0;
let whos_turn = "user";

function setup() {
	createCanvas(b_s * 3 + l_t * 2, b_s * 3 + l_t * 2);
	for (var i = 0; i < 3; i++) {
		game[i] = new Array(3);
	}
	angleMode(DEGREES);
	init();
	console.log(window.location);
}

function draw() {
	paint();
	if (counter == 50) {
		winner_draw();
		pc_play();
		counter = 0;
	} else counter++;

	header.innerHTML = "User: " + user + ", Machine: " + pc;
}

function paint() {
	background(50);

	stroke(255);
	strokeWeight(l_t);
	line(b_s - 1, 0, b_s - 1, height - 1);
	line(b_s * 2 + l_t - 1, 0, b_s * 2 + l_t - 1, height - 1);
	line(0, b_s - 1, width - 1, b_s - 1);
	line(0, b_s * 2 + l_t - 1, width - 1, b_s * 2 + l_t - 1);

	strokeWeight(2 * l_t);
	for (var y = 0; y < 3; y++) {
		for (var x = 0; x < 3; x++) {
			if (game[y][x] == "x") {
				line(x * (b_s + l_t) + 15, y * (b_s + l_t) + 15, x * (b_s + l_t) + 85, y * (b_s + l_t) + 85);
				line(x * (b_s + l_t) + 15, y * (b_s + l_t) + 85, x * (b_s + l_t) + 85, y * (b_s + l_t) + 15);
			}
			if (game[y][x] == "o") {
				fill(50);
				let centerx = x * (b_s + l_t) + b_s / 2 - 1;
				let centery = y * (b_s + l_t) + b_s / 2 - 1;
				circle(centerx, centery, b_s - 20);
			}
		}
	}
}

function mouseClicked() {
	if (whos_turn != "user") return;
	let x = mouseX + 1;
	let y = mouseY + 1;
	if (x > 0 && x < width && y > 0 && y < height) {
		x = int(x / (b_s + l_t));
		y = int(y / (b_s + l_t));
		if (game[y][x] === "0") {
			game[y][x] = "o";
			whos_turn = "pc";
			return 1;
		}
	}
	return 0;
}

function pc_play() {
	if (whos_turn != "pc") return;
	for (var y = 0; y < 3; y++) {
		for (var x = 0; x < 3; x++) {
			if (game[y][x] == "0") {
				game[y][x] = "x";
				whos_turn = "user";
				return;
			}
		}
	}
}

function winner_draw() {
	let a = 0;

	for (var i = 0; i < 3; i++) {
		if (game[i][0] == 'o' && game[i][1] == 'o' && game[i][2] == 'o') a = 2;
		if (game[i][0] == 'x' && game[i][1] == 'x' && game[i][2] == 'x') a = 1;
		if (game[0][i] == 'o' && game[1][i] == 'o' && game[2][i] == 'o') a = 2;
		if (game[0][i] == 'x' && game[1][i] == 'x' && game[2][i] == 'x') a = 1;
	}
	if (game[0][0] == 'o' && game[1][1] == 'o' && game[2][2] == 'o') a = 2;
	if (game[0][0] == 'x' && game[1][1] == 'x' && game[2][2] == 'x') a = 1;
	if (game[0][2] == 'o' && game[1][1] == 'o' && game[2][0] == 'o') a = 2;
	if (game[0][2] == 'x' && game[1][1] == 'x' && game[2][0] == 'x') a = 1;

	let flag = true;
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			if (game[y][x] == "0") flag = false;
		}
	}

	if (a == 1) {
		pc++;
		init();
	} else if (a == 2) {
		user++;
		init();
	} else if (flag == true) {
		init();
	}
}

function init() {
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			game[y][x] = "0";
		}
	}
	whos_turn = "user";
}