const BufferToBlob = (glbData) => {
  const byteArray = new Uint8Array(glbData.data);
  const blob = new Blob([byteArray], { type: "application/octet-stream" });
  const objectUrl = URL.createObjectURL(blob);
  return objectUrl;
};

export default BufferToBlob;
