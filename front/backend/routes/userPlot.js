const express = require('express')
const router = express.Router()
const plotsTemplatesCopy = require('../models/plot')
const userPlotScheme = require('../models/user-plot')
const signUpScheme = require('../models/signupUser')

router.post('/userplots', async(request, response) => {


        const userIdFromDb = await signUpScheme.find({
            "name": "Roni"
        }, {
            _id: 1
        });
        console.log(userIdFromDb)

        const plotIdFromDb = await plotsTemplatesCopy.find({
            "ownerName": "Roni"
        }, {
            _id: 1
        });
        console.log(plotIdFromDb)

        const userPlotScheme1 = new userPlotScheme({
            userId: userIdFromDb[0]._id,
            plotId: plotIdFromDb[0]._id
        });

        userPlotScheme1.save();

        response.json({
            userId: userIdFromDb,
            plotId: plotIdFromDb
        })


    }) // when a user enters every data to buy a plot and click 'send'- a post request has been made and come to this server,method.


module.exports = router