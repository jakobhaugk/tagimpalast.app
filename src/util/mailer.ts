import { createTransport } from 'nodemailer'
import { truncate } from '../util/string'

const { CHAT_MAIL_EMAIL, CHAT_MAIL_PASSWORD, CHAT_MAIL_HOST, CHAT_MAIL_PORT } = process.env



function getTransport() {
  return createTransport(
    `smtps://${CHAT_MAIL_EMAIL}:${CHAT_MAIL_PASSWORD}@${CHAT_MAIL_HOST}:${CHAT_MAIL_PORT}`
  )
}

const sendMails = async function (recipients: string[], text: string) {
  const message = {
    from: CHAT_MAIL_EMAIL,
    to: recipients,
    subject: `Chat: ${truncate(text)}`,
    text,
  }
  await getTransport().sendMail(message)
  console.log(`sent email to ${recipients.join(', ')}`)
}

export { sendMails }