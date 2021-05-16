var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let width = 900;
let height = 600;
let dim = 20;
let cubesx = Math.floor(width / dim);
let cubesy = Math.floor(height / dim);
let m_down = 0;
let modif = 0;

c.width = width;
c.height = height;

let cells = new Array(cubesx);

for (let x = 0; x < cubesx; x++) {
	cells[x] = new Array(cubesy);
	for (let y = 0; y < cubesy; y++) {
		cells[x][y] = 0;
	}
}

let buffer = new Array(cubesx);

for (let x = 0; x < cubesx; x++) {
	buffer[x] = new Array(cubesy);
	for (let y = 0; y < cubesy; y++) {
		buffer[x][y] = 0;
	}
}
cells[10][10] = 1;
cells[10][11] = 1;
cells[10][12] = 1;

let count = 0;

function draw() {
	clear("white");
	for (let x = 0; x < cubesx; x++) {
		for (let y = 0; y < cubesy; y++) {
			if (cells[x][y]) fillrect(x * dim, y * dim, dim, dim, "black");
			else rect(x * dim, y * dim, dim, dim, "black");
		}
	}
	if (count >= 25 && !m_down) {
		modif = 1;
		gen();
		modif = 0;
		count = 0;
	} else count++;
	window.requestAnimationFrame(draw)
}

draw();

document.addEventListener("mousedown", function(event) {
	m_down = 1;
	if(!modif) cells[Math.floor(event.clientX / dim)][Math.floor(event.clientY / dim)] = 1;
});

document.addEventListener("mouseup", function(event) {
	m_down = 0;
});

document.addEventListener("mousemove", function(event) {
	if(m_down && !modif) cells[Math.floor(event.clientX / dim)][Math.floor(event.clientY / dim)] = 1;
});

function gen() {
	let survivors;

	for (let x = 0; x < cubesx; x++) {
		for (let y = 0; y < cubesy; y++) {
			buffer[x][y] = cells[x][y];
		}
	}
	for (let x = 0; x < cubesx; x++) {
		for (let y = 0; y < cubesy; y++) {
			survivors = 0;
			for (let xo = x - 1; xo <= x + 1; xo++) {
				for (let yo = y - 1; yo <= y + 1; yo++) {
					if ((xo >= 0) && (xo < cubesx) && (yo >= 0) && (yo < cubesy) && (xo != x || yo != y)) {
						survivors += buffer[xo][yo];
					}
				}
			}
			cells[x][y] = 0;
			if ((survivors == 3 || survivors == 2) && buffer[x][y]) {
				cells[x][y] = 1;
			}
			if (survivors == 3 && !buffer[x][y]) {
				cells[x][y] = 1;
			}
		}
	}
}

function line(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function circle(x, y, radius, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fill();
}

function fillrect(x, y, width, height, color) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
	ctx.stroke();
}

function rect(x, y, width, height, color) {
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = 1;
	ctx.strokeRect(x, y, width, height);
}

function clear(color) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, c.width, c.height);
	ctx.stroke();
}
