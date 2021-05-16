var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var score = document.getElementById("score");

class box {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.r = 0;
		this.g = 255;
		this.b = 0;
	}
}

let box_size;
let dir = "up";
let add = 0;
let skip = 0;
let moved = 0;
let snake = new Array(5);
let apple = new box(0, 0);
apple.r = 255;
apple.g = 0;
apple.b = 0;
for (let i = 0; i < snake.length; i++) {
	snake[i] = new box(10 + i, 5);
}

ctx.canvas.width = 500;
ctx.canvas.height = 500;
if (ctx.canvas.width <= ctx.canvas.heigth) box_size = Math.round(ctx.canvas.width / 20);
else box_size = Math.round(ctx.canvas.height / 20);

gen_apple();
loop();

function clear(col) {
	ctx.beginPath();
	ctx.fillStyle = col;
	ctx.fillRect(0, 0, c.width, c.height);
	ctx.stroke();
}

function change_dir(new_dir) {
	if (new_dir == "right" && dir != "left") dir = "right";
	if (new_dir == "left" && dir != "right") dir = "left";
	if (new_dir == "up" && dir != "down") dir = "up";
	if (new_dir == "down" && dir != "up") dir = "down";
}

function draw_game() {
	ctx.beginPath();
	ctx.fillStyle = "rgb(" + apple.r + "," + apple.g + "," + apple.b + ")";
	ctx.fillRect(apple.x * box_size, apple.y * box_size, box_size-1, box_size-1);
	ctx.stroke();
	for (let i = 0; i < snake.length; i++) {
		ctx.beginPath();
		ctx.fillStyle = "rgb(" + snake[i].r + "," + snake[i].g + "," + snake[i].b + ")";
		ctx.fillRect(snake[i].x * box_size, snake[i].y * box_size, box_size-1, box_size-1);
		ctx.stroke();
	}
}

function move_snake() {
	if (dir == "up") {
		snake.unshift(new box(snake[0].x, snake[0].y - 1));
		if (!add) snake.pop();
		if (snake[0].y < 0) snake[0].y = Math.round(ctx.canvas.height / box_size - 1);
	}
	if (dir == "down") {
		snake.unshift(new box(snake[0].x, snake[0].y + 1));
		if (!add) snake.pop();
		if (snake[0].y > Math.round(ctx.canvas.height / box_size - 1)) snake[0].y = 0;
	}
	if (dir == "left") {
		snake.unshift(new box(snake[0].x - 1, snake[0].y));
		if (!add) snake.pop();
		if (snake[0].x < 0) snake[0].x = Math.round(ctx.canvas.width / box_size - 1);
	}
	if (dir == "right") {
		snake.unshift(new box(snake[0].x + 1, snake[0].y));
		if (!add) snake.pop();
		if (snake[0].x > Math.round(ctx.canvas.width / box_size - 1)) snake[0].x = 0;
	}
	//paint the snake in fading green
	for (let i = 0; i < snake.length; i++) {
		snake[i].g = 255 - (100 / (snake.length - 1)) * i;
	}
	add = 0;
	moved = 1;
	score.innerHTML = "Score: " + snake.length.toString();
}

function gen_apple() {
	let flag = false;
	let x, y;
	while (!flag) {
		flag = true;
		x = Math.round(Math.random() * ((ctx.canvas.width / box_size) - 1));
		y = Math.round(Math.random() * ((ctx.canvas.height / box_size) - 1));
		if (x == apple.x && y == apple.y) flag = false;
		for (let i = 0; i < snake.length; i++) {
			if (x == snake[i].x && y == snake[i].y) flag = false;
		}
		if (Math.sqrt(Math.pow(x - apple.x, 2) + Math.pow(y - apple.y, 2)) < 10) flag = false;
	}
	apple.x = x;
	apple.y = y;
}

function check() {
	if (snake[0].x == apple.x && snake[0].y == apple.y) {
		gen_apple();
		add = 1;
	}
	let flag = false;
	for (let i = 1; i < snake.length; i++) {
		if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) flag = true;
	}
	if (flag) {
		while (snake.length > 5) snake.pop();
	}

}

document.addEventListener('keydown', (event) => {
	if (event.key == "ArrowRight") change_dir("right");
	if (event.key == "ArrowLeft") change_dir("left");
	if (event.key == "ArrowUp") change_dir("up");
	if (event.key == "ArrowDown") change_dir("down");
});

/*window.addEventListener("devicemotion", function handleMotionEvent(event) {

	var x = event.accelerationIncludingGravity.x;
	var y = event.accelerationIncludingGravity.y;
	var z = event.accelerationIncludingGravity.z;

	if (x < -2 && dir != "left" && moved){
		dir = "right";
		moved = 0;
	} 
	if (x > 2 && dir != "right" && moved){
		dir = "left";
		moved = 0;
	}
	if (y < -2 && dir != "down" && moved){
		dir = "up";
		moved = 0;
	}
	if (y > 2 && dir != "up" && moved){
		dir = "down";
		moved = 0;
	}

}, true);
*/
function loop() {
	
	if (skip == 9) {
		check();
		move_snake();
		skip = 0;
	} else skip++;
	clear("rgb(50,50,50)");
	draw_game();
	window.requestAnimationFrame(loop)
}
