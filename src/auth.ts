import * as jwt from 'jsonwebtoken'
import * as path from 'path'

import { IUserInput } from './models/User'
import { getUser } from './operations/user-operations'
import { checkUserPassword } from './util/crypto'


const { ACCESS_TOKEN_SECRET } = process.env
const loginPageFile = path.resolve(__dirname, '..', 'static', 'login.html')

const getToken = async function (userInput: IUserInput) {

  const user = await getUser(userInput.username);
  if (!user) return null;

  const vaildPassword = await checkUserPassword(userInput, user);
  if (!vaildPassword) return null;

  return jwt.sign({ username: user.username }, ACCESS_TOKEN_SECRET);

}

const verifyRequest = async function (req, res, next) {

  const authHeader = req.headers.authorization;

  if (authHeader) {

    const [_, token] = authHeader.split(' ')

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.sendStatus(403);
        return;
      }

      req.user = user;
      next();
    })

  } else {
    res.sendStatus(401);
  }

}

const handleLogin = async function (req, res) {

  try {
    
    const user: IUserInput = req.body.user;
    if (!user) throw new Error('missing user in body');

    const accessToken = await getToken(user);
    if (!accessToken) throw new Error('username or password incorrect')
    
    res.json({ accessToken });

  } catch (e) {
    console.log(e)
    res.json({
      status: 'failure',
      msg: e.message || JSON.stringify(e)
    });
  }

}


export { verifyRequest, handleLogin }