const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const colasSchema = new Schema({
    fecha: {
        type: String
    },
    ultimo: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model('Colas', colasSchema);