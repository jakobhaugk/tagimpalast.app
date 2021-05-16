require('dotenv').config()
import * as mongoose from 'mongoose';

import { createUser } from './operations/user-operations'

const args = process.argv.slice(2)

const { MONGO_URI } = process.env;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(MONGO_URI, mongoOptions).then(() => {

  switch (args[0]) {
    case 'create-user':
      const [_, username, password] = args;
      if (!username || !password) {
        console.error('please specify username and password')
        break;
      } else {
        createUser({ username, password })
        .then(({ username }) => console.log(`added ${username}`))
        .catch(err => console.error(err))
      }
      break;
  
    default:
      console.log('no arg specified');
      break;
  }

  process.exit(0)
  
})
