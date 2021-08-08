let RED = "rgb(255, 0, 0)";
let GREEN = "rgb(0, 255, 0)";
let BLUE = "rgb(0, 0, 255)";
let YELLOW = "rgb(255, 255, 0)";
let WHITE = "rgb(255, 255, 255)";
let BLACK = "rgb(0, 0, 0)";
let PURPLE = "rgb(128, 0, 128)";
let ORANGE = "rgb(255, 165, 0)";
let GREY = "rgb(128, 128, 128)";
let CYAN = "rgb(173, 216, 230)";
let TURQUOISE = "rgb(64, 224, 208)";

function clear(col) {
	ctx.beginPath();
	ctx.fillStyle = col;
	ctx.fillRect(0, 0, c.width, c.height);
	ctx.stroke();
}

function line(x1, y1, x2, y2, color) {
	ctx.lineWidth = 1;
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(x1 + 0.5, y1 + 0.5);
	ctx.lineTo(x2 + 0.5, y2 + 0.5);
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