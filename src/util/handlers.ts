import { Result, Status } from '../types/global'
import constants from '../const'
import * as path from 'path';


const handleRequestJSON = async function (req, res, fn: (req?, res?) => Promise<any>) {

  let result: Result = { status: Status.Success };

  try {
    result.data = await fn(req, res);
  } catch (e) {
    console.log(e)
    result.status = Status.Failure;
    result.msg = e.message || JSON.stringify(e);
  }

  res.json(result);

}


const handleFileUpload = async function (req, res) {

  let result: Result = { status: Status.Success }

  try {

    if (!req.files || Object.keys(req.files).length === 0) {
      throw new Error('no files uploaded');
    }

    let id = Date.now()

    const uploaded = await Promise.all(Object.values(req.files).map(async (file) => {
      const fileName = `${(id++).toString(36)}.png`
      const filePath = path.join(constants.imagePath, fileName);

      const fileObj: any = file as any;

      return await new Promise((res, rej) => {
        fileObj.mv(filePath, err => {
          if (err) rej(err)
          else res(fileName)
        })
      });
    }));

    result.data = uploaded;

  } catch (e) {
    console.log(e)
    result.status = Status.Failure;
    result.msg = e.message || JSON.stringify(e)
  }

  res.json(result)
}

export { handleRequestJSON, handleFileUpload }