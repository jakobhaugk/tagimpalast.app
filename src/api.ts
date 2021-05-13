import { Status, Result } from './types/global'
import * as op from './operations'

const handleRequestJSON = async function (req, res, fn: (req?, res?) => Promise<Result>) {

  let result: Result;

  try {
    result = await fn(req, res);
  } catch (e) {
    result.status = Status.Failure;
    result.msg = e.message || JSON.stringify(e);
  }

  res.json(result);

}

const getPages = async function (req, res) {

  const fn = async () => ({
    status: Status.Success,
    data: await op.getPages(),
  })

  handleRequestJSON(req, res, fn);

}






export { getPages }