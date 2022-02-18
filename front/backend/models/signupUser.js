const mongoose = require('mongoose')

const signUpScheme = new mongoose.Schema({
        privateKey: {
            type: String,
            required: false
        },
        publicKey: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: true
        },
        ID: {
            type: String,
            required: true
        },
        userType: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        wallet: {
            type: String,
            required: false
        }


    }) //what are the details we want to collect from the user when they buy plots
module.exports = mongoose.model('signup', signUpScheme)