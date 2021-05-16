var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "14px Noto Sans";

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

let box_size = 50;
let offset_y = 0; //pixels of canvas, not real pixels
let offset_x = 0;
let max_offset_x;
let max_offset_y;
let max_boxes_x;
let max_boxes_y;
let color;
let ys, xs;

var img = new Image();
img.onload = function() {
	canvas.width = img.width;
	canvas.height = img.height;
	context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
	init();
};
img.src = "http://localhost:8000/pic.jpeg";

function init() {
	max_boxes_x = Math.floor(c.width / box_size);
	max_boxes_y = Math.floor(c.height / box_size);
	max_offset_x = img.width * box_size - max_boxes_x * box_size;
	max_offset_y = img.height * box_size - max_boxes_y * box_size;
	draw();
}

function draw() {
	ys = -(offset_y % box_size);
	xs = -(offset_x % box_size);
	for(let y = ys; y <= ys + max_boxes_y * box_size + box_size; y+=box_size) 
	{
		for(let x = xs; x <= xs + max_boxes_x * box_size + box_size; x+=box_size) 
		{
			color = context.getImageData((x + offset_x) / box_size, (y + offset_y) / box_size, 1, 1).data;
			fillrect(x, y, box_size, box_size, "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
			if(box_size >= 50) {
				if((color[0]+color[1]+color[2])/3 < 127) {
					ctx.fillStyle = "rgb(" + 255 + "," + 255 + "," + 255 + ")";
				}
				else{
					ctx.fillStyle = "rgb(" + 0 + "," + 0 + "," + 0 + ")";
				}
				ctx.fillText('R ' + color[0], x + (box_size-40)/2, y + 15);
				ctx.fillText('G ' + color[1], x + (box_size-40)/2, y + 31);
				ctx.fillText('B ' + color[2], x + (box_size-40)/2, y + 47);
			}
		}
	}
}

document.addEventListener("keydown", (event) => {
	switch(event.key){
		case "i":
			if(box_size < 70) { 
				box_size+=5;
				max_boxes_x = Math.floor(c.width / box_size);
				max_boxes_y = Math.floor(c.height / box_size);
				max_offset_x = img.width * box_size - max_boxes_x * box_size;
				max_offset_y = img.height * box_size - max_boxes_y * box_size;
			}
			break;
		case "o":
			if(box_size != 5) {
				box_size-=5;
				max_boxes_x = Math.floor(c.width / box_size);
				max_boxes_y = Math.floor(c.height / box_size);
				max_offset_x = img.width * box_size - max_boxes_x * box_size;
				max_offset_y = img.height * box_size - max_boxes_y * box_size;
			}
			break;
		case "ArrowRight":
			if(offset_x < max_offset_x) offset_x+=5;
			break;
		case "ArrowLeft":
			if(offset_x != 0) offset_x-=5;
			break;
		case "ArrowUp":
			if(offset_y != 0) offset_y-=5;
			break;
		case "ArrowDown":
			if(offset_y < max_offset_y) offset_y+=5;
			break;
	}
	draw();
});

window.addEventListener("resize", function(){
	// c.width = window.innerWidth;
	// c.height = window.innerHeight;
});

function line(x1, y1, x2, y2) {
	ctx.strokeStyle = "black";
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
