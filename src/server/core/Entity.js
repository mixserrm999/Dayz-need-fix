// Base entity for player
module.exports = function () {
    let self = {
        x: 250,
        y: 250,
        spdX: 0,
        spdY: 0,
        id: '',
        level: 1,
        face: 'right',
        name: 'NoName'
    }
    self.update = function () {
        self.updatePos();
    }
    self.updatePos = function () {
        self.x += self.spdX;
        self.y += self.spdY;
    }
    return self;
}