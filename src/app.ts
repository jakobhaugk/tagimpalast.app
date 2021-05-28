require('dotenv').config()
import * as path from 'path'
import * as express from 'express'
import * as cors from 'cors'
import * as mongoose from 'mongoose';
import * as fs from 'fs'
import * as http from 'http'
import * as https from 'https'
import { Server } from 'socket.io'

import router from './router';
import { handleLogin } from './auth'
import constants from './const'

import injectSocketIO from './api/chat-api'


const { HTTP_PORT, HTTPS_PORT, HOST, PRODUCTION } = process.env

const { MONGO_URI } = process.env;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const { imagePath, landingPagePath, adminPagePath, previewPagePath } = constants;


// static vue apps

const app = express();

// certbot verification
app.use('/.well-known', express.static(path.resolve(__dirname, '..', 'static', '.well-known')))

// admin app
app.use('/admin', express.static(adminPagePath));
app.get('/admin', (req, res) => res.sendFile(path.join(adminPagePath, 'index.html')))

// mirror of landing page app for preview purposes
app.use('/preview', express.static(previewPagePath));
app.get('/preview', (req, res) => res.sendFile(path.join(previewPagePath, 'index.html')))


// landingpage app
app.use('/', express.static(landingPagePath));
app.get('/', (req, res) => res.sendFile(path.join(landingPagePath, 'index.html')))

// static images
app.use('/images', express.static(imagePath))



// rest api 

app.use(express.json());
app.use(cors({ origin: '*' }))

// routes
app.post('/login', handleLogin)
app.use('/api', router)


const httpServer = http.createServer(app)

const httpIO = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  allowEIO3: true,
});
injectSocketIO(httpIO);

mongoose.connect(MONGO_URI, mongoOptions).then(() => {

  if (PRODUCTION === '1') {

    // https redirect
    app.enable('trust proxy')
    app.use((req, res, next) => {
      if (req.secure) return next();
      else res.redirect(`https://${req.headers.host}${req.url}`)
    })

    const credentials = {
      key: fs.readFileSync(process.env.SSL_KEY, 'utf-8'),
      cert: fs.readFileSync(process.env.SSL_CERT, 'utf-8'),
    }

    const httpsServer = https.createServer(credentials, app)

    const httpsIO = new Server(httpsServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
      allowEIO3: true,
    });
    injectSocketIO(httpsIO)

    httpsServer.listen(HTTPS_PORT || 443, () => {
      console.log(`https server running on ${HOST}:${HTTPS_PORT}`)
    })

  } else {

    httpServer.listen(HTTP_PORT || 80, () => {
      console.log(`http server running on ${HOST}:${HTTP_PORT}`)
    })

  }
})

