const mongoose = require('mongoose')

const signUpScheme = new mongoose.Schema({


        ID: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        }

    }) //what are the details we want to collect from the user when they buy plots
module.exports = mongoose.model('login', signUpScheme)