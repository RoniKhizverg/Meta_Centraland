const express = require('express') //our intire application use Express
const router = express.Router() //we want the router portion of express
const Place = require('../models/place')
    //Getting all
router.get('/', async(req, res) => {
    try {
        const places = await Place.find()
        res.json(places)
    } catch (err) {
        res.status(500).json({
                message: err.message
            }) // if there is a error we want to send that to the user as json because this is a json api
            //500 error means that there is an error on our server(our fault)
    }

})

//Getting one
router.get("/:id", getPlace, (req, res) => {
    res.json(res.place)
})

//creating one

router.post('/', async(req, res) => {
    const {
        name,
        country,
        description,
        images
    } = req.body; //the body is whatever the user sends to us which is going to be json 
    var place = new Place({
        name,
        country,
        description
    });
    if (images !== "") {
        place.images = images;
    }
    try {
        const newPlace = await place.save();
        res.redirect('http://127.0.0.1:5500/client/index.html'); //status 201 means that the created was succesful
    } catch (err) {
        res.status(400).json({
            message: err.message
        }); //status 400 means that the user gives us bad data
    }
});

//updating only part from the object
router.patch('/:id', getPlace, async(req, res) => {
        if (req.body.name != null) {
            res.place.name = req.body.name
        }
        if (req.body.country != null) {
            res.place.country = req.body.country
        }
        if (req.body.description != null) {
            res.place.description = req.body.description
        }
        try {
            const updatePlace = await res.place.save() //the updated version of out place if they successfully saved 
            res.json(updatePlace)
        } catch (err) {
            res.status(400).json({
                message: err.message
            })

        }


    })
    //deleting one
router.delete('/:id', getPlace, async(req, res) => {
        try {
            await res.place.remove()
            res.json({
                message: 'Deleted place!'
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    })
    //Get the place the user entered
async function getPlace(req, res, next) {
    let place
    try {
        place = await Place.findById(req.params.id)
        if (place == null) {
            return res.status(404).json({
                message: 'Cannot find Place'
            })
        }
    } catch (err) {
        return res.status(500).json({
                message: err.message
            }) // status 500 means that there is something wrong with our circuit
    }
    res.place = place
    next() // we successfully completed the entire function so next will allow us to move on the next piece
}

module.exports = router