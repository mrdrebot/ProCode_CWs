const socketio = require('socket.io');
const min = 1000;
const max = 10000;
let count = 0;

//Функция генерирования случайных чисел
const time = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const wsServer = (http) => {
    const io = socketio(http);
    let clients = [];

    io.on('connection', socket => {
        console.log(`Cliend with id ${socket.id} connected`);
        clients.push(socket.id);

        // socket.emit('message', 'I`m server!');
        // socket.on('message', message => console.log('Message', message));
        socket.on('message', (message) => {
            console.log('Message from front:', message);

            const seconds = time(min, max);

            let sendMessageTimer = setInterval(() => {
                count++;
                
                if (count > 2) {
                    count = 0;
                    // socket.disconnect();
                    clearInterval(sendMessageTimer);
                } else {
                    socket.emit('message', `Delay = ${seconds / 1000}s!`);
                    socket.emit('message', `${message} - ${count}!`);
                }
            }, seconds);
            
        });

        socket.on('disconnect', ()=> {
            clients.splice(clients.indexOf(socket.id), 1);
            console.log(`Client with id ${socket.id} disconnected!`);
        });
    });
};

module.exports = wsServer;