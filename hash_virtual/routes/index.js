var express = require('express');
var router = express.Router();
const controllers = require('../controllers');
const multer = require('multer');
const upload = multer();
// const { createHash } = require('crypto');

// //  функция преобразования введенного пароля в hash
// const transPassHash = (req, res, next) => {
//     const hash = createHash('sha256');
//     hash.update(req.body.password);
//     req.body.password = hash.digest('hex');
//     next();
// }; 

/* Загрузка основной страницы */
router.get('/', controllers.renderIndexPage);

//  Загрузка данных с фронта и запись нового пользователя
// router.post('/insert', upload.none(), transPassHash, controllers.addNewUser);
router.post('/insert', upload.none(), controllers.addNewUser);

//  Загрузка страницы ввода даных для зарегестрированны пользователей
router.get('/signin', controllers.renderSignInPage);

//  Загрузка данных о существующем пользователи и проверка введенных данных на валидность
// router.post('/signin', upload.none(), transPassHash, controllers.checkSignInData);
router.post('/signin', upload.none(), controllers.checkSignInData);

//  Загрузка страницы пользователя прошедшего проверку 
router.get('/welcome/:name', controllers.renderWelcomePage);

module.exports = router;
