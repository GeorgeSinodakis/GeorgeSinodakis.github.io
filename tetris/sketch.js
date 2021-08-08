var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var scoreTag = document.getElementById("score");

var tilesX = 10;
var tilesY = 30;
var tileSize = 20;
let lineColor = "rgb(70,70,70)";
let backgroundColor = BLACK;
let clock = 0;
let game = new Tetris(tilesX, tilesY);

ctx.canvas.width = tilesX * tileSize + tilesX + 1;
ctx.canvas.height = tilesY * tileSize + tilesY + 1;

loop();

document.addEventListener('keydown', (event) => {
	if (event.key == "ArrowRight") game.Right();
	if (event.key == "ArrowLeft") game.Left();
	if (event.key == "ArrowUp") game.Rotate();
	if (event.key == "ArrowDown") game.DownFast();
});

function draw() {
	for (let x = 0; x < ctx.canvas.width; x += (tileSize + 1)) {
		line(x, 0, x, ctx.canvas.height - 1, lineColor);
	}
	for (let y = 0; y < ctx.canvas.height; y += (tileSize + 1)) {
		line(0, y, ctx.canvas.width - 1, y, lineColor);
	}
	game.Draw();
}

function update() {
	game.Update();
}

function loop() {
	clock++;
	if (clock == 60) {
		clock = 0
		update();
	}
	clear(backgroundColor);
	draw();
	window.requestAnimationFrame(loop)
}
