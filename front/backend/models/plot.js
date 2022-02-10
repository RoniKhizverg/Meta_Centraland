const mongoose = require('mongoose')
const express = require('express'); //going to pulling te express library


const plotScheme = new mongoose.Schema({
        ownerName: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        avaibleForSale: {
            type: Boolean,
            required: true
        }


    }) //what are the details we want to collect from the user when they buy plots
module.exports = mongoose.model('Plot', plotScheme)