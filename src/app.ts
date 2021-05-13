require('dotenv').config()
import * as path from 'path'
import * as express from 'express'
import * as mongoose from 'mongoose';


import * as operations from './operations'
import ComponentType from './models/ComponentType'

const { PORT, HOST } = process.env

const { MONGO_URI } = process.env;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const app = express();

const staticPath = path.resolve(__dirname, '..', 'static')
const landingPagePath = path.join(staticPath, 'landingpage')
const adminPagePath = path.join(staticPath, 'admin')
app.use(express.static(landingPagePath));
app.use(express.static(adminPagePath));

app.get('/', (req, res) => res.sendFile(path.join(landingPagePath, 'index.html')))

mongoose.connect(MONGO_URI, mongoOptions).then(() => {

  app.listen(PORT, async () => {

    console.log(`app running on ${HOST}:${PORT}`)

    const update = await operations.updatePage('bild-vom-osten', { componentData: {
      heading: 'Das Bild vom Osten',
      html: '<p>Welche Bilder vom Osten haben wir und welche wollen wir zeichnen? Welche Impulse können vom Osten für die Zukunft ausgehen? Wie kann die Geschichte Ostdeutschlands neu erzählt werden? In kurzen Videoclips äußern sich Künstler:innen und Kulturschaffende aus nah und fern, Ost und West. Sie alle verbindet, dass sie Teil des Netzwerks sind, aus dem sich das Festival OSTEN 2022 zusammensetzen wird. </p>'
    }})
    console.log({update})
    const p = await operations.getPageDetails('bild-vom-osten')
    console.log(p)
  })
})

