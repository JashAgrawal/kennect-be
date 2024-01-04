const uploadToGCP = (bucket, file, filePath, isPublic = false) => {
  return new Promise((resolve, reject) => {
    try {
      const blob = bucket.file(filePath.replace(/ /g, '_'));
      const blobStream = blob.createWriteStream({
        resumeable: false,
        gzip: true,
        contentType: true
      });

      blobStream
        .on('finish', async () => {
          if (isPublic) {
            await bucket.file(filePath).makePublic();
          }
          resolve(blob.name);
        })
        .on('error', error => {
          console.log(error);

          reject(error);
        })
        .end(file.buffer);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export default uploadToGCP;
