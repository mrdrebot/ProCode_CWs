const mongoose = require('mongoose');
const generalSchema = require('./schema');
const path = require('path');

//  запрос на список все дней в базе данных
generalSchema.statics.findAllDays = async function() {
    const allDays = await this.find({});
    return allDays;
};

//  создание нового дня в базе данных
generalSchema.statics.createDayInDB = async function(insData) {
    const newDay = {
        date: insData.date,
        temperature: insData.temperature,
        pressure: insData.pressure,
        humidity: insData.humidity,
        wind: insData.wind,
    };

    return this.create(newDay)
    .then(r => this.find({}))
    .catch(err => {
        return err;
    });
};

//  создание виртуальных переменных для перевода величин
generalSchema.virtual('temperatureInF')
.get(function () {
    return this.temperature + 32;
})
.set(function (param) {
    this.temperature = param + 32;
});

generalSchema.virtual('pressureInPA')
.get(function () {
    return this.pressure * 0.0001333224;
})
.set(function (param) {
    this.pressure = param * 0.0001333224;
});

generalSchema.virtual('humidityInAf')
.get(function () {
    return this.humidity / 100;
})
.set(function (param) {
    this.humidity = param / 100;
});

generalSchema.virtual('windInKh')
.get(function () {
    return (this.wind * 60) / 1000;
})
.set(function (param) {
    this.wind = (param * 60) / 1000;
});

const modelName = path.basename(__dirname);
const model = mongoose.model(modelName, generalSchema);

module.exports = model;
