class Tile {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    Up() {
        this.y += 1;
    }
    Down() {
        this.y -= 1;
    }
    Left() {
        this.x -= 1;
    }
    Right() {
        this.x += 1;
    }
    Rotate(origin) {
        this.x -= origin[0]
        this.y -= origin[1]

        let newX = this.y
        let newY = -this.x

        newX += origin[0]
        newY += origin[1]
        
        this.x = newX
        this.y = newY
    }
    CollisionCheck(second) {
        return (this.x==second.x && this.y==second.y)
    }
    OutOfBounds(tilesX) {
        return (this.x < 0 || this.x >= tilesX || this.y < 0)
    }
    Draw(tilesY) {
        fillrect(this.x * (tileSize + 1) + 1, (tilesY - this.y - 1) * (tileSize + 1) + 1, tileSize, tileSize, this.color);
    }
}