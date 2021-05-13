import { Result, Status } from '../types/global'

const handleRequestJSON = async function (req, res, fn: (req?, res?) => Promise<any>) {

  let result: Result = { status: Status.Success };

  try {
    result.data = await fn(req, res);
  } catch (e) {
    result.status = Status.Failure;
    result.msg = e.message || JSON.stringify(e);
  }

  res.json(result);

}


export { handleRequestJSON }