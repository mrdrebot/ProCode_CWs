const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const multer = require('multer');
const upload = multer();

/* GET home page. */
router.get('/', controllers.renderIndexPage);

//  роут получения данных о всех пользователях и выводе на фронт
router.post('/', controllers.displayAllDays);

//  роут получения данных о всех пользователях и выводе на фронт
router.post('/insertDay', upload.none(), controllers.setDay);

module.exports = router;
