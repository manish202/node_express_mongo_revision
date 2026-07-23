import express from 'express';
import { createServer } from 'node:http';
import {Server} from 'socket.io';
const app = express();

app.set('view engine','ejs');
app.get('/',(req,res) => {
    res.status(200).render('socket');
});
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('client connected', socket.id);
    socket.on('message2', (msg) => {
        console.log(msg);
        io.emit('message2','hello from server');
    });
    socket.on('disconnect', () => console.log('Disconnected'));
});
server.listen(3000, () => console.log('server is running'));