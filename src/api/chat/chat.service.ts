import dbService from "../../services/MongoDb.service";
import TodoItem from "../../interfaces/TodoItem";
import newRedis from "../../server";
import ChatMsg from "../../interfaces/ChatMsg";

async function get() {
    const collection = await dbService.getCollection('chat')
    try {
        const chats = await collection.find().toArray();
        return chats
    } catch (err) {
        console.log('ERROR: cannot find chats')
        throw err;
    }
}

async function getById(id: string) {
    const collection = await dbService.getCollection('chat')
    try {
        const chats = await collection.find({ _id: +id }).toArray();
        return chats[0]
    } catch (err) {
        console.log('ERROR: cannot find chats')
        throw err;
    }
}


async function update(_id: string, newMsg: ChatMsg) {
    const collection = await dbService.getCollection('chat')
    try {
        await collection.updateOne({ "_id": +_id }, { $push: { "msgs": newMsg } })
        return
    } catch (err) {
        console.log(`ERROR: cannot update game ${_id}`)
        throw err;
    }
}

async function add(chat: TodoItem) {
    const collection = await dbService.getCollection('chat')
    try {
        await collection.insertOne(chat);
        return chat;
    } catch (err) {
        console.log(`ERROR: cannot add game`)
        throw err;
    }
}


export default { get, getById, update, add }