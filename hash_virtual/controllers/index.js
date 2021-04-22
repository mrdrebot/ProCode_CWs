const User = require('../model/Users');

const renderIndexPage = (req, res) => {
    res.render('index', { title: 'Class work 2021-04-17' });
};

const renderSignInPage = (req, res) => {
    res.render('signin', { title: 'Sing in' });
};

const renderWelcomePage = (req, res) => {
    res.render('welcome', { title: `Welcome your page, ${req.params.name}!` });
};

// добавляем новго пользователя, данные получаем сиз формы с фронта
const addNewUser = (req, res) => {
    User.createUserInDB(req.body)
    .then(r => res.send(r))
    .catch(er => console.log('User create ERROR:', er));
};

// добавляем новoго пользователя, данные получаем с формы
const checkSignInData = (req, res) => {
    User.validateUserData(req.body)
    .then(r => res.send({ result: r, name: req.body.name }))
    .catch(er => { 
        console.log('User validate ERROR:', er);
        res.send(er);
    });
};

module.exports = {
    renderIndexPage,
    renderSignInPage,
    renderWelcomePage,
    addNewUser,
    checkSignInData,
};