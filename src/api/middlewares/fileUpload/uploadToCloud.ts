import { Container } from 'typedi';
import { nanoid } from 'nanoid'
import config from '../../../config';
import gcsHelper from '../../../helpers/googleCloudStorage';

const uploadToCloud = (folder, filename = folder) => {

  return async (req, res, next) => {
    try {
      const { file, body } = req;

      const communityName = req.headers['community-name'];
      const storage = Container.get('storage') as any;
      const bucket = storage.bucket(config.googleCloudStorage.bucketName);
      let filePath;

      switch (req.originalUrl) {
        case 'post/createWithMedia': filePath = `${communityName}/${folder}/${body.type}/${body.type}-${filename}-${nanoid()}-${~~(Date.now() / 1000)}`;
          break;
        default: filePath = `${communityName}/${folder}/${filename}-${nanoid()}-${~~(Date.now() / 1000)}`;
          break;
      }

      const image = await gcsHelper.uploadFile(bucket, file, filePath, true);

      req.body.picture = image;
      next();
    } catch (error) {
      return next(error);
    }

  }
};

export default uploadToCloud;
