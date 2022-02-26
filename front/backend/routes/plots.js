const express = require('express');
const router = express.Router()
const plotsTemplatesCopy = require('../models/plot') //import the shceme we have created
const columnsAmount = 200;
const rowsAmount = 200;
const cells = [];
const schemePlots = [];
const SHA256 = require('crypto-js/sha256');
const { hash } = require('bcrypt');


router.get('/', async(req, res) => {
    try {
        const plot = await plotsTemplatesCopy.find()
        res.json(plot)
    } catch (err) {
        res.status(500).json({
                message: err.message
            }) // if there is a error we want to send that to the user as json because this is a json api
            //500 error means that there is an error on our server(our fault)
    }

})








router.delete('/:id', getPlot, async(req, res) => {
    try {
        await res.plot.remove()
        res.json({
            message: 'Deleted plot!'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.patch('/:id', getPlot, async(req, res) => {

    if (req.body.ownerName != null) {
        res.plot.ownerName = req.body.ownerName
    }
    if (req.body.price != null) {
        res.plot.price = req.body.price
    }
    if (req.body.description != null) {
        res.plot.description = req.body.description
    }
    if (req.body.avaibleForSale != null) {
        res.plot.avaibleForSale = req.body.avaibleForSale
    }
    if (req.body.row != null) {
        res.plot.row = req.body.row
    }
    if (req.body.column != null) {
        res.plot.column = req.body.column
    }
    if (req.body.userid != null) {
        res.plot.userid = req.body.userid
    }
    if (req.body.linkToGame != null) {
        res.plot.linkToGame = req.body.linkToGame
    }
    try {
        const updatePlot = await res.plot.save() //the updated version of our plot if they successfully saved 
        res.json(updatePlot)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })

    }


})




async function getPlot(req, res, next) {
    let plot
    try {
        plot = await plotsTemplatesCopy.findById(req.params.id)
        if (plot == null) {
            return res.status(404).json({
                message: 'Cannot find plot'
            })
        }
    } catch (err) {
        return res.status(500).json({
                message: err.message
            }) // status 500 means that there is something wrong with our circuit
    }
    res.plot = plot
    next()

}



router.post('/plots', async(request, response) => {




    let userPlot = '';
    for (let i = 0; i < 20000; i++) {


        userPlot = new plotsTemplatesCopy({
            ownerName: "O&R.Ltd",
            price: Math.floor(Math.random() * 200),
            description: `index ${i}`,
            avaibleForSale: true,
            row: Math.floor(Math.random() * 200),
            column: Math.floor(Math.random() * 200),
            userid: request.body.userid,
            hash: SHA256(userPlot.description).toString()

        })

        userPlot.save()
    }
    response.json({
        success: "ok"
    })

})


module.exports = router