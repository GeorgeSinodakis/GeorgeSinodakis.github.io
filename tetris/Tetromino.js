class Tetromino {
    constructor(index, tilesX, tilesY) {
        this.Tiles = new Array(0);
        this.origin = new Array(2);
        this.position = new Array(2);

        switch (index) {
            case 0:
                this.Tiles.push(new Tile(0, 0, CYAN), new Tile(1, 0, CYAN), new Tile(2, 0, CYAN), new Tile(3, 0, CYAN))
                this.origin[0] = 1.5;
                this.origin[1] = -0.5;
                this.position[0] = tilesX / 2 - 2;
                this.position[1] = tilesY - 1;
                break;
            case 1:
                this.Tiles.push(new Tile(0, 0, BLUE), new Tile(-1, 0, BLUE), new Tile(-1, 1, BLUE), new Tile(1, 0, BLUE))
                this.origin[0] = 0;
                this.origin[1] = 0;
                this.position[0] = tilesX / 2 - 1;
                this.position[1] = tilesY - 2;
                break;
            case 2:
                this.Tiles.push(new Tile(0, 0, ORANGE), new Tile(-1, 0, ORANGE), new Tile(1, 1, ORANGE), new Tile(1, 0, ORANGE))
                this.origin[0] = 0;
                this.origin[1] = 0;
                this.position[0] = tilesX / 2 - 1;
                this.position[1] = tilesY - 2;
                break;
            case 3:
                this.Tiles.push(new Tile(0, 0, YELLOW), new Tile(1, 0, YELLOW), new Tile(0, 1, YELLOW), new Tile(1, 1, YELLOW))
                this.origin[0] = 0.5;
                this.origin[1] = 0.5;
                this.position[0] = tilesX / 2 - 1;
                this.position[1] = tilesY - 2;
                break;
            case 4:
                this.Tiles.push(new Tile(0, 0, GREEN), new Tile(-1, 0, GREEN), new Tile(0, 1, GREEN), new Tile(1, 1, GREEN))
                this.origin[0] = 0;
                this.origin[1] = 0;
                this.position[0] = tilesX / 2 - 1;
                this.position[1] = tilesY -  2;
                break;
            case 5:
                this.Tiles.push(new Tile(0, 0, PURPLE), new Tile(-1, 0, PURPLE), new Tile(1, 0, PURPLE), new Tile(0, 1, PURPLE))
                this.origin[0] = 0;
                this.origin[1] = 0;
                this.position[0] = tilesX / 2 - 1;
                this.position[1] = tilesY -  2;
                break;
            case 6:
                this.Tiles.push(new Tile(0, 0, RED), new Tile(1, 0, RED), new Tile(0, 1, RED), new Tile(-1, 1, RED))
                this.origin[0] = 0;
                this.origin[1] = 0;
                this.position[0] = tilesX / 2 - 1;
                this.position[1] = tilesY -  2;
                break;
        }

        this.origin[0] += this.position[0];
        this.origin[1] += this.position[1];

        for (let i = 0; i < 4; i++) {
            this.Tiles[i].x += this.position[0];
            this.Tiles[i].y += this.position[1];
        }
    }
    Rotate() {
        for (let i = 0; i < 4; i++) {
            this.Tiles[i].Rotate(this.origin);
        }
    }
    Down() {
        for (let i = 0; i < 4; i++) {
            this.Tiles[i].Down();
        }
        this.origin[1] -= 1;
    }
    Up() {
        for (let i = 0; i < 4; i++) {
            this.Tiles[i].Up();
        }
        this.origin[1] += 1;
    }
    Left() {
        for (let i = 0; i < 4; i++) {
            this.Tiles[i].Left();
        }
        this.origin[0] -= 1;
    }
    Right() {
        for (let i = 0; i < 4; i++) {
            this.Tiles[i].Right();
        }
        this.origin[0] += 1;
    }
    Draw(tilesY) {
        for (let i = 0; i < 4; i++) {
            this.Tiles[i].Draw(tilesY);
        }
    }
    OutOfBounds(tilesX) {
        for(let i = 0; i < 4; i++) {
            if (this.Tiles[i].OutOfBounds(tilesX)) return true;
        }
        return false;
    }
    CollisionCheck(second) {
        for(let i = 0; i < 4; i++) {
            if (this.Tiles[i].CollisionCheck(second)) return true;
        }
        return false;
    }
}