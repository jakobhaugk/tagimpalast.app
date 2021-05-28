import * as express from 'express'
import * as fileUpload from 'express-fileupload'

import * as content from './api/content-api'
import * as user from './api/user-api'
import * as chat from './api/chat-api'
import { verifyRequest } from './auth'
import { handleFileUpload } from './util/handlers'

const router = express.Router();

// pages

router.get('/pages', content.getPages)
router.get('/page/:slug', content.getPage)

router.put('/page', verifyRequest, content.createPage)

router.post('/page/:slug', verifyRequest, content.updatePage)

router.delete('/page/:slug', verifyRequest, content.deletePage)


// user

router.use('/user', verifyRequest)

router.put('/user', user.createUser)
router.get('/user', user.getUser)


// uploads

router.use(fileUpload())

router.put('/image', handleFileUpload)


// chat

router.put('/chat', chat.createMessage)

router.get('/chat', verifyRequest, chat.getMessages)
router.post('/chat/answer/:id', verifyRequest, chat.setAnswered)

export default router;