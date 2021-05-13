import { User, UserModel, IUserInput } from '../models/User'

const createUser = async function(input: IUserInput) {
  const userData = await User.fromInput(input);
  const user = await UserModel.create(userData);
  return user;
}

const getUser = async function(username: string) {
  return await UserModel.findOne({ username });
}



export { createUser, getUser }