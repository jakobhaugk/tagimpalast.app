import * as op from '../operations/user-operations'
import { handleRequestJSON } from '../util/handlers'
import { IUserInput, IUserOutput } from '../models/User';



const createUser = async function (req, res) {

  const fn = async (req) => {
    const { user } = req.body;
    if(!user) throw new Error('missing user in body');

    await op.createUser(user as IUserInput);
    return true;
  }

  handleRequestJSON(req, res, fn);
}

const getUser = async function (req, res) {

  const fn = async (req) => {

    const { username } = req.user
    if (!username) throw new Error()

    const user = await op.getUser(username);

    delete user.passwordHash;

    return user as IUserOutput;
  }

  handleRequestJSON(req, res, fn);
}

export { createUser, getUser }