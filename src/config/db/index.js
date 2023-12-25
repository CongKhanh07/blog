const mongoose = require('mongoose');

mongoose
    .connect('mongodb://127.0.0.1:27017/f8_education_dev')
    .then(() => console.log('Connected!'));

function connect() {}

module.exports = { connect };
