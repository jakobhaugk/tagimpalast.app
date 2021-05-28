import { ChatMessageModel, ChatMessage, IChatMessage } from '../models/ChatMessage';
import constants from '../const'


interface ChatMessagesFilter {
  limit?: number,
  includeAnswered?: boolean,
  answeredOnly?: boolean
}

const getMessages = async (filter: ChatMessagesFilter = {}) => {

  let query: IChatMessage = { isAnswered: false }
  if (filter.includeAnswered) query = {}
  if (filter.answeredOnly) query.isAnswered = true;

  return await ChatMessageModel.find(query);

}

const createMessage = async (input: IChatMessage) => {
  
  if (!input.message || input.message.length > constants.chatMaxChars)
    throw new Error('invalid message');

  return await ChatMessageModel.create(input as ChatMessage);
  
}

const updateMessage = async (_id: String, update: IChatMessage) => {
  return await ChatMessageModel.findOneAndUpdate({ _id }, { $set: update }, { new: true })
}

export { getMessages, createMessage, updateMessage }