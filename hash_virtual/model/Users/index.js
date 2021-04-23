const mongoose = require('mongoose');
const generalSchema = require('./schema');
const path = require('path');
const { createHash } = require('crypto');

generalSchema.virtual("hash")
.set(function (param) {
    const hash = createHash('sha256');
    hash.update(param);
    this.password = hash.digest('hex');
});

generalSchema.statics.createUserInDB = async function(newUserData) {
    return this.create(newUserData)
            .then(r => 'User added to base!')
            .catch(err => {
                return err;
            });
};

generalSchema.statics.findUserByName = async function(name) {
    return await this.find({ name: name });
};

generalSchema.methods.validateUserPassword = function(password) {
    if (this.password === password) {
        return true;
    } else {
        return false;
    }
};

const modelName = path.basename(__dirname);
const model = mongoose.model(modelName, generalSchema);
module.exports = model;
