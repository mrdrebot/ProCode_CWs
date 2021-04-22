const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 250,
    },
    password: {
        type: String,
        maxLength: 250,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });
