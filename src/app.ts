require('dotenv').config()
import * as path from 'path'
import * as express from 'express'
import * as mongoose from 'mongoose';

import router from './router';

const { PORT, HOST } = process.env

const { MONGO_URI } = process.env;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const app = express();


// static serving

const staticPath = path.resolve(__dirname, '..', 'static')
const landingPagePath = path.join(staticPath, 'landingpage')
const adminPagePath = path.join(staticPath, 'admin')
app.use(express.static(landingPagePath));
app.use(express.static(adminPagePath));

app.get('/', (req, res) => res.sendFile(path.join(landingPagePath, 'index.html')))


// api

app.use(express.json());

app.use('/api', router)

mongoose.connect(MONGO_URI, mongoOptions).then(() => {

  app.listen(PORT, async () => {

    console.log(`app running on ${HOST}:${PORT}`)

    
  })
})

