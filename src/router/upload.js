const router = require('express').Router();
const { uploadPhotos } = require('@/controllers/upload');

const multer = require('multer');
const upload = multer({ dest: './src/tmp/uploads' });

router.post('/photos', upload.array('photos', 12), uploadPhotos);

module.exports = (app) => app.use('/app/uploads', router);
