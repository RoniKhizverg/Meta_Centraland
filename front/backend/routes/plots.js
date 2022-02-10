const express = require('express')
const router = express.Router()
const plotsTemplatesCopy = require('../models/plot') //import the shceme we have created


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
async function getPlot(req, res, next) {
    let plot
    try {
        plot = await plotsTemplatesCopy.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({
                message: 'Cannot find plot'
            })
        }
    } catch (err) {
        return res.status(500).json({
                message: err.message
            }) // status 500 means that there is something wrong with our circuit
    }
    res.plot = user
    next()

}



router.post('/plots', async(request, response) => {
        const userPlot = new plotsTemplatesCopy({
            ownerName: request.body.ownerName,
            price: request.body.price,
            avaibleForSale: request.body.avaibleForSale
        })
        userPlot.save()
            .then(data => {
                response.json(data)
            })

    }) // when a user enters every data to buy a plot and click 'send'- a post request has been made and come to this server,method.


module.exports = router