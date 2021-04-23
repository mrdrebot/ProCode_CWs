const User = require('../model/Users');

//  функция создания временного документа коллекции без записи в базу
const tempUser = (data) => {
    const user = new User(data);
    user.hash = user.password;
    return user;
};

const renderIndexPage = (req, res) => {
    res.render('index', { title: 'Class work 2021-04-17' });
};

const renderSignInPage = (req, res) => {
    res.render('signin', { title: 'Sing in' });
};

const renderWelcomePage = (req, res) => {
    res.render('welcome', { title: `Welcome your page, ${req.params.name}!` });
};

// добавляем новго пользователя, данные получаем из формы с фронта
const addNewUser = (req, res) => {
    const newUser = tempUser(req.body);

    User.createUserInDB(newUser)
    .then(r => res.send(r))
    .catch(er => console.log('User create ERROR:', er));
};

// проверяем пользователя, данные получаем с формы
const checkSignInData = async (req, res) => {
    const newUser = tempUser(req.body);
    const userFromDB = await User.findUserByName(req.body.name);

    if (!userFromDB[0]) {
        res.send(false);
    } else {
        const checkPasswordResult = newUser.validateUserPassword(userFromDB[0].password);
        (checkPasswordResult) ? res.send({ result: checkPasswordResult, name: req.body.name }) : res.send(false);
    }
};

module.exports = {
    renderIndexPage,
    renderSignInPage,
    renderWelcomePage,
    addNewUser,
    checkSignInData,
};