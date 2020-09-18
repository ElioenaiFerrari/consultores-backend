const UploadRepository = require('@/repositories/upload');

module.exports = {
  uploadPhotos: (req, res) => UploadRepository.uploadPhotos(req, res),
};
