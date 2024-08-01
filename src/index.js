import express from 'express';
import path from 'path';
import url from 'url';
import 'dotenv/config';
import { Server as WebSocketServer } from 'socket.io';
import http from 'http';

const app = express();
const port = process.env.PORT || 3000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = http.createServer(app);

const io = new WebSocketServer(server);

///////////////////////////////////////websocket////////////////////////////////////////////////////////////

io.on('connection', (socket) => {
    console.log('>>> Socket conectado >>>', socket.id);//socket me permite ver lo datos del cliente conectado

    /**emisiones */
    /**obtener respuesta del front */
    socket.on('nombre-paciente', (nombre)=> {
        console.log('User ID recibido: ', nombre); // Asegurarse de que el ID se recibe correctamente
        io.emit('toastr-event', `${nombre}`);
    });

    socket.on('disconnect', () => {
        console.log('>>> Socket desconectado >>>');
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(express.static(path.join(__dirname, '../frontend/src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/src/index.html'));
});

server.listen(port, () => {
    console.log('Servidor corriendo en puerto:', port);
});

