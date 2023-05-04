// TODO: Fix this chat code
// var chatText = document.getElementById('chat-text');
// var chatInput = document.getElementById('chat-input');
// socket.on('addToChat', function (data) {
//     chatText.innerHTML += '<div>' + data + '</div>';
// })
// var chatForm = document.getElementById('chat-form');
// chatForm.onsubmit = function (e) {
//     e.preventDefault();
//     socket.emit('sendMsgToServer', chatInput.value);
//     chatInput.value = '';
// }

let socket = io();
let formPlayerIngress = document.getElementById('player-form');
let inputPlayerName = document.getElementById('player-input');
formPlayerIngress.addEventListener('submit', startGame);

function startGame(event) {
    event.preventDefault();
    socket.emit('setPlayerName', { userName: inputPlayerName.value ? inputPlayerName.value : 'NoName' })
    let canvas = document.getElementById('ctx')
    formPlayerIngress.style.display = 'none';
    canvas.style.display = '';
    var ctx = canvas.getContext('2d');

    socket.on('newPosition', function (data) {
        ctx.clearRect(0, 0, 800, 600);

        data.playersPack.map(player => {
            let heightOfPlayer = 25
            ctx.fillRect(player.x, player.y - 10, 10, heightOfPlayer);
            ctx.font = '12px Arial';
            ctx.fillText(player.name, player.x, player.y + heightOfPlayer);
            ctx.font = '10px Arial';
            ctx.fillText('Level: ' + player.level, player.x, player.y + heightOfPlayer + 10);
        })

        data.bulletsPack.map(bullet => {
            ctx.fillRect(bullet.x - 5, bullet.y - 5, 10, 10);
        })
        // for (var i = 0; i < data.playersPack.length; i++) {
        //     let heightOfPlayer = 25
        //     ctx.fillRect(data.player[i].x, data.player[i].y - 10, 10, heightOfPlayer);
        //     ctx.font = '12px Arial';
        //     ctx.fillText(data.player[i].name, data.player[i].x, data.player[i].y + heightOfPlayer);
        //     ctx.font = '10px Arial';
        //     ctx.fillText('Level: ' + data.player[i].level, data.player[i].x, data.player[i].y + heightOfPlayer + 10);
        // };
        // for (var i = 0; i < data.bulletsPack.length; i++) {
        // };
        document.onkeydown = function (event) {
            if (event.key == 'd') { socket.emit('keyPress', { inputId: 'right', state: true }); }
            else if (event.key == 's') { socket.emit('keyPress', { inputId: 'down', state: true }); }
            else if (event.key == 'a') { socket.emit('keyPress', { inputId: 'left', state: true }); }
            else if (event.key == 'w') { socket.emit('keyPress', { inputId: 'up', state: true }); }
            // else if (event.key == 'j') { socket.emit('playerFire', { state: true }); }
        }
        document.onkeyup = function (event) {
            if (event.key == 'd') { socket.emit('keyPress', { inputId: 'right', state: false }); }
            else if (event.key == 's') { socket.emit('keyPress', { inputId: 'down', state: false }); }
            else if (event.key == 'a') { socket.emit('keyPress', { inputId: 'left', state: false }); }
            else if (event.key == 'w') { socket.emit('keyPress', { inputId: 'up', state: false }); }
            else if (event.key == 'j') { socket.emit('playerFire'); }
        }

    });
}
