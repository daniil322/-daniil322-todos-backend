import { Socket } from "socket.io"
import ChatMsg from "../../interfaces/ChatMsg"


function connectSockets(io: SocketIO.Server) {
    io.on('connection', (socket: Socket) => {

        socket.on('chat newMsg', (msg: { topic: string, msg: ChatMsg }) => {
            io.to(msg.topic).emit('chat newMsg', msg.msg)
        })
        socket.on('join room', topic => {
            socket.join(topic.topic)
        })

        socket.on('leave room', topic => {
            socket.leave(topic.topic)
        })

        socket.on('new topic', topic => {
            io.emit('new topic', topic)
        })

    })
}

export default connectSockets
