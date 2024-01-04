import uploadToGCP from './file-upload';
import deleteFileFromGCP from './delete-file';
import signedURL from './signed-url';
import publicURL from './public-url';

export default {
  uploadFile: uploadToGCP,
  deleteFile: deleteFileFromGCP,
  getSignedURL: signedURL,
  getPublicURL: publicURL,
};
