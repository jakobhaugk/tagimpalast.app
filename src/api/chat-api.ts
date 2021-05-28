import { Server } from 'socket.io'

import * as op from '../operations/chat-operations';
import { handleRequestJSON } from '../util/handlers';
import constants from '../const'
import { sendMails } from '../util/mailer'

let io: Server;

const getMessages = async function (req, res) {

  const fn = async (req) => {
    console.log(req.query)
    return await op.getMessages({ 
      includeAnswered: req.query.includeAnswered === 'true',
      answeredOnly: req.query.answeredOnly === 'true',
    });
  }

  handleRequestJSON(req, res, fn);
}


const createMessage = async function (req, res) {

  const fn = async (req) => {
    const { message } = req.body;
    if (!message) throw new Error('missing message in body');

    const newMessage = await op.createMessage(req.body);

    io.emit('newMessage', newMessage);

    const { forwardChatTo } = constants;
    if (forwardChatTo && forwardChatTo.length > 0) {
      const message = `
        ${newMessage.message}\n\n
        Uhrzeit: ${newMessage.createdAt.toLocaleTimeString()}
      `
      sendMails(forwardChatTo, message);
    }

    return null;
  }

  handleRequestJSON(req, res, fn);
}

const setAnswered = async function (req, res) {

  const fn = async (req) => {
    const { id } = req.params;
    if (!id) throw new Error('missing message id');

    const answered = req.body.answered ?? true;

    await op.updateMessage(id, { isAnswered: answered });
    return null;
  }

  handleRequestJSON(req, res, fn);
}


export { getMessages, createMessage, setAnswered }
export default function(socketIO: Server) {
  io = socketIO;
  io.on('connection', socket => console.log('client connected'))
}