require('dotenv').config()
const path = require('path')
const express = require('express')

const { PORT, HOST } = process.env

const app = express();

const staticPath = path.resolve(__dirname, '..', 'static')
const landingPagePath = path.join(staticPath, 'landingpage')
const adminPagePath = path.join(staticPath, 'admin')
app.use(express.static(landingPagePath));
app.use(express.static(adminPagePath));

app.get('/', (req, res) => res.sendFile(path.join(landingPagePath, 'index.html')))

app.listen(PORT, () => {
  console.log(`app running on ${HOST}:${PORT}`)
})