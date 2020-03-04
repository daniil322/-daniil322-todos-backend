import ChatMsg from '../interfaces/ChatMsg';
import Redis from 'ioredis';

export default class RedisClient {
	client: Redis.Redis

	constructor(redisPort: string | undefined) {
		this.client = new Redis(redisPort);
	}

	setCache(key: string, value: object) {
		this.client.set(key, JSON.stringify(value))
	}

	connect = () => {
		this.client.on('connect', () => console.log('connected'));
		this.client.on('error', (err: Error) => console.log(err));
	}

	add = async (key: string, newMsg: ChatMsg) => {
		const msgs = await this.getCache(key)
		if (msgs) {
			const newMsgs = [...msgs, newMsg]
			return this.setCache(key, newMsgs)
		} else {
			return this.setCache(key, [newMsg])
		}
	}

	getCache = (key: string = 'keys'): Promise<ChatMsg[] | null> => {
		return new Promise((resolve, reject) => {
			this.client.get(key, (err: Error | null, data: string | null) => {
				if (err) reject(err);
				if (data) {
					return resolve(JSON.parse(data));
				} else {
					return resolve(null);
				}
			})
		})
	}
}


