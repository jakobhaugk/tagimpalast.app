import { prop, getModelForClass } from '@typegoose/typegoose'

interface IChatMessage {
  message?: string,
  isRead?: boolean,
  isAnswered?: boolean,
  createdAt?: Date;
}

class ChatMessage implements IChatMessage {

  @prop({ required: true })
  public message!: string;

  @prop({ default: false })
  public isRead: boolean;

  @prop({ default: false })
  public isAnswered: boolean;

  @prop({ default: () => Date.now() })
  public createdAt: Date;

}

const ChatMessageModel = getModelForClass(ChatMessage);

export { ChatMessageModel, IChatMessage, ChatMessage }