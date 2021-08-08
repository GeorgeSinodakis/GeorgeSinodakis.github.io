class Tetris {
    constructor(tilesX, tilesY) {
        this.tilesX = tilesX;
        this.tilesY = tilesY;
        this.bucket = new Array(0);
        this.current = null;
        this.score = 0;
        this.index = 0;
        this.bag = new Array(0);

        this.Reset();
    }
    Down() {
        this.current.Down();
        if (this.OutOfBounds() || this.CollisionCheck()) {
            this.current.Up();
            this.EmptyToBucket();
            this.NewTetromino();
            return false;
        }
        return true;
    }
    DownFast() {
        while(this.Down());
    }
    Left() {
        this.current.Left();
        if (this.OutOfBounds() || this.CollisionCheck()) {
            this.current.Right();
            return false;
        }
        return true;
    }
    Right() {
        this.current.Right();
        if (this.OutOfBounds() || this.CollisionCheck()) {
            this.current.Left();
            return false;
        }
        return true;
    }
    Rotate() {
        this.current.Rotate();
        if (this.OutOfBounds() || this.CollisionCheck()) {
            this.current.Rotate();
            this.current.Rotate();
            this.current.Rotate();
        }
    }
    Update() {
        
        this.Clean();
        this.Down();
        this.CheckGameOver();
    }
    CheckGameOver() {
        if(this.bucket.filter((obj) => obj.y > this.tilesY - 5).length) this.Reset();
    }
    Reset() {
        this.score = 0;
        this.bucket.length = 0;
        this.NewTetromino();
    }
    EmptyToBucket() {
        for(let i = 0; i < 4; i++) {
            this.bucket.push(this.current.Tiles[i]);
        }
    }
    NewTetromino() {
        if(this.index == 0) {
            this.bag.length = 0;
            while(this.bag.length != 7) {
                let rand = Math.floor(Math.random() * 7);
                if(this.bag.filter((obj) => obj == rand).length == 0) this.bag.push(rand);
            }
        }
        this.current = new Tetromino(this.bag[this.index], this.tilesX, this.tilesY);
        this.index++;
        if (this.index == 7) this.index = 0;
        
    }
    RemoveLine(line) {
        this.bucket = this.bucket.filter((obj) => obj.y != line);
        for (let i = 0; i < this.bucket.length; i++) {
            if(this.bucket[i].y > line) {
                this.bucket[i].y--;
            }
        }
        this.score++;
    }
    Clean() {
        for(var line = 0; line < this.tilesY; line++) {
            if (this.bucket.filter((obj) => obj.y === line).length === this.tilesX) {
                this.RemoveLine(line);
            }
        }
    }
    OutOfBounds() {
        return this.current.OutOfBounds(this.tilesX);
    }
    CollisionCheck() {
        for(let i = 0; i < this.bucket.length; i++) {
            if(this.current.CollisionCheck(this.bucket[i])) return true;
        }
    }
    Draw() {
        for(let i = 0; i < this.bucket.length; i++) {
            this.bucket[i].Draw(this.tilesY);
        }
        this.current.Draw(this.tilesY);
        scoreTag.innerHTML = "Score: " + this.score;
    }
}