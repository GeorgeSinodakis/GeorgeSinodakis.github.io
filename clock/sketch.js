var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let width = 500;
let height = 500;

c.width = width;
c.height = height;

ctx.translate(width / 2, height / 2);

function line(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function circle(x, y, radius) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.stroke();
}

function clear() {
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(-c.width / 2, -c.height / 2, c.width, c.height);
	ctx.stroke();
}

function draw() {
	clear();
	ctx.strokeStyle = "black";
	for (let angle = 0; angle < 360; angle += 360 / 60) {
		if (!(angle % 5)) {
			ctx.lineWidth = 3;
			line(200 * Math.cos(angle * (Math.PI / 180)), 200 * Math.sin(angle * (Math.PI / 180)), 240 * Math.cos(angle * (Math.PI / 180)), 240 * Math.sin(angle * (Math.PI / 180)));
		} else {
			ctx.lineWidth = 1;
			line(220 * Math.cos(angle * (Math.PI / 180)), 220 * Math.sin(angle * (Math.PI / 180)), 240 * Math.cos(angle * (Math.PI / 180)), 240 * Math.sin(angle * (Math.PI / 180)));
		}
	}
	var d = new Date();
	var ms = d.getMilliseconds();
	var s_angle = (Math.PI * 2 * (d.getSeconds() * 1000 + ms)) / 60000 - Math.PI / 2;
	var m_angle = (Math.PI * 2 * (d.getMinutes() * 60 + d.getSeconds())) / 3600 - Math.PI / 2;
	var h_angle = (Math.PI * 2 * (d.getHours() * 60 + d.getMinutes())) / 720 - Math.PI / 2;
	ctx.lineWidth = 1;
	line(0, 0, 180 * Math.cos(s_angle), 180 * Math.sin(s_angle));
	ctx.lineWidth = 3;
	ctx.strokeStyle = "blue";
	line(0, 0, 170 * Math.cos(m_angle), 170 * Math.sin(m_angle));
	ctx.lineWidth = 5;
	ctx.strokeStyle = "red";
	line(0, 0, 160 * Math.cos(h_angle), 160 * Math.sin(h_angle));
	window.requestAnimationFrame(draw)
}

draw();
