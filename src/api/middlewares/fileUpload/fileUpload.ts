import multer from 'multer';
const path = require('path');
var fs = require('fs');
const FileUpload = (key: string, multiple: boolean = false,folder:string) => {
  var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      const dir = `./upload/${folder}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
          recursive: true,
        });
      }
      callback(null, `./upload/${folder}`);
    },
    filename: function (req, file, callback) {
      callback(null, `${folder}` + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  if (multiple) {
    return multer().array(key);
  } else {
    return multer({ storage: storage }).single(key);
  }
};

export default FileUpload;
