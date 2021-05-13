import * as express from 'express'

import * as content from './api/content-api'
import * as user from './api/user-api'

const router = express.Router();

// pages

router.get('/pages', content.getPages)
router.get('/page/:slug', content.getPage)

router.put('/page', content.createPage)

router.post('/page/:slug', content.updatePage)

router.delete('/page/:slug', content.deletePage)


// user

router.put('/user', user.createUser)

export default router;