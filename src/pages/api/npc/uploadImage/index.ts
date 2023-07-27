import { changeUserImage } from '@/utils/models/user-model';
import { authFromServer } from '@/utils/services/useAuth';

import formidable from 'formidable';

import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req: any, res: any) {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).send({ success: false, message: 'Unauthorized' });
  const form = new formidable.IncomingForm();
  const { _id: userId } = await authFromServer(token);
  form.parse(req, (err: any, fields: any, files: any) => {
    if (err) throw err;
    const file = files.myImage;
    const maxSize = 1024 * 1024; // 1 MB

    var unix = Math.round(+new Date() / 1000);
    const oldPath = files.myImage.filepath;
    const fileName = unix + '-' + files.myImage.originalFilename;
    const newPath = path.join(process.cwd(), 'public/images/users', fileName);

    fs.rename(oldPath, newPath, (err) => {
      if (err) throw err;
      const dataPath = process.env.API_URL + 'images/users/' + fileName;
      const data = changeUserImage(userId, dataPath);
      res.status(200).send(data);
    });
  });
}
