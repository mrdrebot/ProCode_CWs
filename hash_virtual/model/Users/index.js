const mongoose = require('mongoose');
const generalSchema = require('./schema');
const path = require('path');

generalSchema.statics.createUserInDB = async function(insData) {
    const newUser = {
        name: insData.name,
        password: insData.password,
        email: insData.email,
    };

    return this.create(newUser)
            .then(r => 'User added to base!')
            .catch(err => {
                return err;
            });
};

generalSchema.statics.validateUserData = async function(data) {
    const { name, password } = data;
    const foundUser = await this.find({ name: name });

    if (foundUser[0].password === password) {
        return true;
    } else {
        return false;
    }
};

const modelName = path.basename(__dirname);
const model = mongoose.model(modelName, generalSchema);
module.exports = model;
