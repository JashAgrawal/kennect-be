function getPublicURL(bucketName, fileName) {
  return new Promise(resolve => {
    const BASE_URL = `https://storage.googleapis.com`;
    const url = `${BASE_URL}/${bucketName}/${fileName}`;
    resolve(url);
  });
}

export default getPublicURL;
