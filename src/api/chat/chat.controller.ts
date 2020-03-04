import { Request, Response } from "express";
import newRedis from '../../server'
import chatService from "./chat.service";



async function getChats(req: Request, res: Response) {
    try {
        const chats = await chatService.get()
        res.send(chats)
    } catch (err) {
        console.log(err)
    }
}

async function getChatById(req: Request, res: Response) {
    const { _id } = req.params
    const cachedChat = await newRedis.getCache(_id)
    if (cachedChat) {
        return res.send({ msgs: cachedChat })
    }
    try {
        const chat = await chatService.getById(_id)
        res.send(chat)
    } catch (err) {
        console.log(err)
    }
}


async function updateChat(req: Request, res: Response) {
    const newMsg = req.body
    const { _id } = req.params
    try {
        const todos = await chatService.update(_id, newMsg)
        newRedis.add(_id, newMsg)
        res.send(todos)
    } catch (err) {
        console.log(err)
    }
}

async function addChat(req: Request, res: Response) {
    const chat = req.body
    try {
        const newChat = await chatService.add(chat)
        res.send(newChat)
    } catch (err) {
        console.log(err)
    }
}

export default { getChats, updateChat, addChat, getChatById }