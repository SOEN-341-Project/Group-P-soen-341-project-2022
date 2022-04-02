import multer from 'multer';

const multerMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    // max 5 mb files
    fileSize: 5 * 1024 * 1024,
  },
});

export default multerMiddleware;
