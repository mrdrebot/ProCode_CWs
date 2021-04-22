const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
    date: {
        type: Date,
        required: true,
    },
    temperature: {
        type: Number,
        min: -50,
        max: 50,
        required: true,
    },
    pressure: {
        type: Number,
        max: 1000,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },
    wind: {
        type: Number,
        max: 200,
        required: true,
    },
}, { timestamps: true });
