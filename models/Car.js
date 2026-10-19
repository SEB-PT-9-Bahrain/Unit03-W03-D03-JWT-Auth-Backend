const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    make:{
        type: String,
    },
    model:{
        type: String,
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})



const Car = mongoose.model('Car',carSchema)

module.exports = Car