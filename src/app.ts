require('dotenv').config()
import * as path from 'path'
import * as express from 'express'
import * as cors from 'cors'
import * as mongoose from 'mongoose';

import router from './router';
import { handleLogin, verifyRequest } from './auth'
import constants from './const'

const { PORT, HOST } = process.env

const { MONGO_URI } = process.env;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const app = express();


// static file serving

const { imagePath, landingPagePath, adminPagePath } = constants;

app.use('/', express.static(landingPagePath));
app.get('/', (req, res) => res.sendFile(path.join(landingPagePath, 'index.html')))

app.use('/admin', express.static(adminPagePath));
app.get('/admin', (req, res) => res.sendFile(path.join(adminPagePath, 'index.html')))

app.use('/images', express.static(imagePath))


// api

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())

app.post('/login', handleLogin)
app.use('/api', router)

mongoose.connect(MONGO_URI, mongoOptions).then(() => {

  app.listen(PORT, async () => {

    console.log(`app running on ${HOST}:${PORT}`)

    
  })
})

