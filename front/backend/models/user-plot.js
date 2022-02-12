const mongoose = require('mongoose')

const userPlotScheme = new mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        plotId: {
            type: String,
            required: true
        }


    }) //what are the details we want to collect from the user when they buy plots
module.exports = mongoose.model('userplot', userPlotScheme)