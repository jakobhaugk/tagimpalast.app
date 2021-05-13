import * as express from 'express'

import * as content from './api/content-api'
import * as user from './api/user-api'
import { verifyRequest } from './auth'

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
// router.get('/user', user.getUser)

export default router;