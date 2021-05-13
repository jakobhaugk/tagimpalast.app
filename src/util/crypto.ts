import * as bcrypt from 'bcrypt'

const saltRounds = 10;

const hash = async (input: string): Promise<string> => new Promise((res, rej) => {
  bcrypt.hash(input, saltRounds, (err, result: string) => {
    if (err) rej(err)
    else res(result)
  })
})

export { hash }