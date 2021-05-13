import * as bcrypt from 'bcrypt'
import { IUser, IUserInput } from '../models/User';

const saltRounds = 10;

const hash = async (input: string): Promise<string> => {
  return await bcrypt.hash(input, saltRounds)
}

const checkUserPassword = async function(userInput: IUserInput, user: IUser): Promise<boolean> {
  return await bcrypt.compare(userInput.password, user.passwordHash)
}

export { hash, checkUserPassword }