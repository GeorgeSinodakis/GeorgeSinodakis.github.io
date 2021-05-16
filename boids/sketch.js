var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let width = 900;
let height = 600;

c.width = width;
c.height = height;

let ar = new Array(10);

for (let i = 0; i < ar.length; i++) ar[i] = new particle;

function draw() {
	clear("rgb(200, 255, 255)");
	for (let j = 0; j < ar.length; j++) {
		ar[j].show();
		ar[j].update();
		//steer to the average speed
		ar[j].align(ar);

	}
	window.requestAnimationFrame(draw)
}

draw();

document.addEventListener("mousedown", function(event) {});

document.addEventListener("mouseup", function(event) {});

document.addEventListener("mousemove", function(event) {});

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
