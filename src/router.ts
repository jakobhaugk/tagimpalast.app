import * as express from 'express'

import * as api from './api'

const router = express.Router();


router.get('pages', api.getPages)


export default router;