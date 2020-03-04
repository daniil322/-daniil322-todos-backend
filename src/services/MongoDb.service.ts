
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = "mongodb+srv://daniil:01020304@cluster0-esoug.mongodb.net/test?retryWrites=true&w=majority"

// Database Name
const dbName = 'CHAT_DB';

var dbConn: null = null;

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}


async function getCollection(collectionName: string) {
    const db = await connect()
    return db.collection(collectionName);
}

export default {
    getCollection
}