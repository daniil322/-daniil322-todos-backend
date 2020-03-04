
import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import path from 'path'

import RedisClient from './services/redis.service'
import todosRoutes from './api/chat/chat.routes'
import connectSockets from "./api/socket/socket.routes"

const redisPort: string | undefined = process.env.REDIS_URL


const app = express()
var http = require('http').createServer(app)
const io: SocketIO.Server = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const newRedis = new RedisClient(redisPort);
newRedis.connect()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

app.use('/api/chat', todosRoutes)


connectSockets(io)

const port = process.env.PORT || 3030;
http.listen(port, () => {
    console.log("Todos server is running on port : " + port);
});

export default newRedis


