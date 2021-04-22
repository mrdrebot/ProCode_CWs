//  Подключаем модель и схему солекции Users
const Days = require('../model/Days');

//  функция перевода велечин
const transOfValues = (daysArr) => {
    daysArr.forEach(day => {
        day.temperatureInF = day.temperature;
        day.pressureInPA = day.pressure;
        day.humidityInAf = day.humidity;
        day.windInKh = day.wind;
    });
};

const renderIndexPage = (req, res) => {
    res.render('index', { title: 'Home work, virtual fields display' });
};

//  выводим все дни
const displayAllDays = async (req, res) => {
    const allDays = await Days.findAllDays();
    transOfValues(allDays);
    res.send(allDays);
};

// добавляем новый день, данные получаем с формы фронта
const setDay = async (req, res) => {
    await Days.createDayInDB(req.body)
    .then(allDays => {
        if(!allDays.errors) transOfValues(allDays);
        res.send(allDays);
    })
    .catch(err => {
        console.log(`ERROR send info to front: ${err}`);
        res.send(err);
    });
};

module.exports = {
    renderIndexPage,
    displayAllDays,
    setDay,
};