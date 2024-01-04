function getFileLink(bucket, fileName) {
  return new Promise(async (resolve, reject) => {
    try {
      const fileRef = bucket.file(fileName);

      const data = await fileRef.exists();
      if (data[0]) {
        const config = {
          action: 'read',

          // A timestamp when this link will expire
          expires: '01-01-2026',
        };

        // Get the link to that file
        fileRef.getSignedUrl(config, function (err, url) {
          if (err) {
            console.error(err);
            return;
          }

          // The file is now available to
          // read from this URL
          resolve(url);
        });
      } else {
        resolve(null);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export default getFileLink;
