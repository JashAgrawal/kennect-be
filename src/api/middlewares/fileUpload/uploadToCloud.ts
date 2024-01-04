import config from '../../../config';
import gcsHelper from '../../../helpers/googleCloudStorage';

const uploadToCloud = (folder, filename = folder) => {

  return async (req, res, next) => {
    try {
      
      next();
    } catch (error) {
      return next(error);
    }

  }
};

export default uploadToCloud;
