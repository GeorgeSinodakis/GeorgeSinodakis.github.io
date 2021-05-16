class particle {
	constructor() {
		this.x0 = Math.random() * width / 8 + width / 2 - width / 16;
		this.y0 = Math.random() * height / 8 + height / 2 - height / 16;
		this.x1 = Math.random() * 2 - 1;
		this.y1 = Math.random() * 2 - 1;
		this.x2 = 0;
		this.y2 = 0;
	}
	update() {
		this.x0 += this.x1;
		this.y0 += this.y1;
		this.x1 += this.x2;
		this.y1 += this.y2;
	}
	align0(arr) {
		for (let i = 0; i < arr.length; i++) {
			let avgx = 0;
			let avgy = 0;
			for (let j = 0; j < arr.length; j++) {
				if (i != j) {
					avgx += arr[j].x0;
					avgy += arr[j].y0;
				}
			}
			this.x1 += 0.001 * (avgx / (arr.length - 1) - this.x0);
			this.y1 += 0.001 * (avgy / (arr.length - 1) - this.y0);
		}
	}
	show() {
		circle(this.x0, this.y0, 5, "black");
	}
}
