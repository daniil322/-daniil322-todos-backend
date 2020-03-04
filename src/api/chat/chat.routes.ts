import express from 'express'
import chatController from './chat.controller'


const router = express.Router()

router.get('/', chatController.getChats)
router.get('/:_id', chatController.getChatById)
router.post('/', chatController.addChat)
router.put('/:_id', chatController.updateChat)

export default router  