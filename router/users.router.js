const controller = require('../controller/users.controller');
const express = require('express');
const verifyToken = require('../midellware/verifyToken.js');
const router = express.Router();
const apperror = require('../uitlls/apperror.js');
const multer  = require('multer');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('file', file);
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const filename = `user-${Date.now()}.${ext}`;
        cb(null, filename);
    }
});
const fileFilter= (req, file, cb) => {
    const filetypes = file.mimetype.split('/')[0];
    if (filetypes === 'image') {
        cb(null, true);
    } else {
        cb(apperror.create('image only',400), false);
    }
};

const upload = multer({ 
    storage: diskStorage, 
    fileFilter: fileFilter
});

router.route('/')
    .get(verifyToken,controller.getAllUsers)

router.route('/register')
    .post(upload.single('avatar'),controller.registerUser); 

router.route('/login')
    .post(controller.loginUser)

module.exports = router;