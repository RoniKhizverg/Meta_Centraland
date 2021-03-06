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
        description: {
            type: String,
            required: false
        },
        avaibleForSale: {
            type: Boolean,
            required: true
        },
        row: {
            type: String,
            required: true
        },
        column: {
            type: String,
            required: true
        },
        userid: {
            type: String,
            required: false
        },
        linkToGame: {
            type: String,
            required: false
        },
        hash: {
            type: String,
            required: true
        }


    }) //what are the details we want to collect from the user when they buy plots
module.exports = mongoose.model('Plot', plotScheme)