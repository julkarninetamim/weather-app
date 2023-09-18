const mongoose = require('mongoose')
const Schema = mongoose.Schema
//JS এ datatype না বলে দিতে হলেও mongoose এ ডাটা টাইপ বলে দিতে হয়
const HistorySchema = new Schema({
    icon: String,
    name: String,
    country: String,
    main: String,
    description: String,
    temp: Number,
    pressure: Number,
    humidity: Number
})

const History = mongoose.model('History', HistorySchema)
module.exports = History

