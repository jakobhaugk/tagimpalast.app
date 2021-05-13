import { prop, getModelForClass } from '@typegoose/typegoose'
import { hash } from '../util/crypto'

interface IUserBase {
  username: string,
  name?: string
}

interface IUserInput extends IUserBase {
  password: string
}

interface IUser extends IUserBase {
  passwordHash: string,
}

class User implements IUser {

  @prop({ unique: true, maxlength: 30, trim: true, lowercase: true, required: true })
  public username!: string;

  @prop({ required: true })
  public passwordHash!: string;

  @prop()
  public name?: string;

  constructor (input: IUser) {
    this.username = input.username;
    this.passwordHash = input.passwordHash;
    this.name = input.name;
  }

  static async fromInput(input: IUserInput) {
    const passwordHash = await hash(input.password);
    return new User({ ...input, passwordHash} as IUser);
  }
  
}

const UserModel = getModelForClass(User)

export { User, IUser, UserModel, IUserInput }