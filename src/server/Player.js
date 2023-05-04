let Entity = require('./core/Entity')
let { Bullet } = require('./Bullet.js')
let Player = function (id) {
    let self = Entity();
    self.id = id;
    self.name = '';
    self.number = '' + Math.floor(10 * Math.random());
    self.moveRight = false;
    self.moveLeft = false;
    self.moveUp = false;
    self.moveDown = false;
    self.face = 'right'
    self.speed = 5;

    let super_update = self.update;

    self.update = function () {
        self.updateSpd();
        super_update();
    }

    self.updateSpd = function () {
        if (self.moveRight)
            self.spdX = self.speed;
        else if (self.moveLeft)
            self.spdX = -self.speed;
        else
            self.spdX = 0;

        if (self.moveUp)
            self.spdY = -self.speed;
        else if (self.moveDown)
            self.spdY = self.speed;
        else
            self.spdY = 0;
    }
    Player.list[id] = self;
    return self;
}
Player.list = [];
Player.onConnect = function (socket) {
    let player = Player(socket.id); // Here we declare the player
    socket.on('setPlayerName', function (data) { player.name = data.userName })
    socket.on('keyPress', function (data) {
        if (data.inputId === 'left') { player.moveLeft = data.state; }
        else if (data.inputId === 'right') { player.moveRight = data.state; }
        else if (data.inputId === 'up') { player.moveUp = data.state; }
        else if (data.inputId === 'down') { player.moveDown = data.state; }

        player.face = data.inputId
    });

    socket.on('playerFire', function (data) {
        Bullet({ x: player.x, y: player.y }, player.face)
    })
}
Player.onDisconnect = function (socket) {
    delete Player.list[socket.id];
}
Player.update = function () {
    let playersPack = [];
    let bulletsPack = [];
    for (let i in Player.list) {
        let player = Player.list[i];
        player.update();
        playersPack.push({
            x: player.x,
            y: player.y,
            number: player.number,
            name: player.name,
            level: player.level
        });
    }
    for (let i in Bullet.list) {
        let bullet = Bullet.list[i];
        bullet.update();
        bulletsPack.push({
            x: bullet.x,
            y: bullet.y,
        });
    }
    return { playersPack, bulletsPack };
}

module.exports = { Player }