function main(bucket, fileName) {
  return new Promise(async (resolve, reject) => {
    try {
      await bucket.file(fileName).delete();
      resolve(`File deleted`);
    } catch (error) {
      reject(error);
    }
  });
}

export default main;
