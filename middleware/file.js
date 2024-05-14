import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
});

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
};

const upload = multer({ 
    storage,
    fileFilter,
});

export {
  upload,
}