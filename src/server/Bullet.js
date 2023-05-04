let Entity = require('./core/Entity')
let Bullet = function (start_point, angle) {
    let self = Entity();
    self.id = Math.random();
    self.x = start_point.x;
    self.y = start_point.y;
    let bulletSpeed = 7
    switch (angle) {
        case 'left':
            self.spdX = -bulletSpeed
            self.spdY = 0
            break;
        case 'right':
            self.spdX = bulletSpeed
            self.spdY = 0
            break;
        case 'up':
            self.spdX = 0
            self.spdY = -bulletSpeed
            break;
        case 'down':
            self.spdX = 0
            self.spdY = bulletSpeed
            break;
        default:
            self.spdX = bulletSpeed
            self.spdY = 0
            break;
    }

    self.timer = 0;
    self.toRemove = false;
    let super_update = self.update;
    self.update = function () {
        if (self.timer++ > 100) {
            self.toRemove = true;
        }
        super_update();
    }
    Bullet.list[self.id] = self;
    return self;
}
Bullet.list = [];
// Bullet.update = function () {
//     let pack = [];
//     for (let i in Bullet.list) {
//         let bullet = Bullet.list[i];
//         bullet.update();
//         pack.push({
//             x: bullet.x,
//             y: bullet.y,
//         });
//     }
//     return pack;
// }

module.exports = { Bullet }
