require('dotenv').config()
import * as path from 'path'
import * as express from 'express'
import * as cors from 'cors'
import * as mongoose from 'mongoose';
import * as http from 'http'
import * as https from 'https'

import router from './router';
import { handleLogin } from './auth'
import constants from './const'

const { API_PORT, STATIC_PORT, HOST } = process.env

const { MONGO_URI } = process.env;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const { imagePath, landingPagePath, adminPagePath, previewPagePath } = constants;


// static vue apps

const staticApp = express();

// admin app
staticApp.use('/admin', express.static(adminPagePath));
staticApp.get('/admin', (req, res) => res.sendFile(path.join(adminPagePath, 'index.html')))

// mirror of landing page app for preview purposes
staticApp.use('/preview', express.static(previewPagePath));
staticApp.get('/preview', (req, res) => res.sendFile(path.join(previewPagePath, 'index.html')))

// landingpage app
staticApp.use('/', express.static(landingPagePath));
staticApp.get('/', (req, res) => res.sendFile(path.join(landingPagePath, 'index.html')))

const staticServer = http.createServer(staticApp);
staticServer.listen(STATIC_PORT, () => {
  console.log(`static server running on ${HOST}:${STATIC_PORT}`)
})



// rest api app

const app = express()

// static images
app.use('/images', express.static(imagePath))

app.use(express.json());
app.use(cors())

// routes
app.post('/login', handleLogin)
app.use('/api', router)

const apiServer = http.createServer(app)

mongoose.connect(MONGO_URI, mongoOptions).then(() => {

  apiServer.listen(API_PORT, async () => {

    console.log(`api server running on ${HOST}:${API_PORT}`)
    
  })
})

