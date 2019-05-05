const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Course = new Schema({
    des: {
        type: String
    },
    title: {
        type: String
    },
    image: {
        type: String
    },
    link: {
        type: String
    }
});

module.exports = mongoose.model('Course', Course);