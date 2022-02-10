const express = require('express')
const router = express.Router()
const signupTemplatesCopy = require('../models/signupUser') //import the shceme we have created

router.get('/', async(req, res) => {
    try {
        const signup = await signupTemplatesCopy.find()
        res.json(signup)
    } catch (err) {
        res.status(500).json({
                message: err.message
            }) // if there is a error we want to send that to the user as json because this is a json api
            //500 error means that there is an error on our server(our fault)
    }

})

router.delete('/:id', getUser, async(req, res) => {
    try {
        await res.user.remove()
        res.json({
            message: 'Deleted user!'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})
async function getUser(req, res, next) {
    let user
    try {
        user = await signupTemplatesCopy.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({
                message: 'Cannot find User'
            })
        }
    } catch (err) {
        return res.status(500).json({
                message: err.message
            }) // status 500 means that there is something wrong with our circuit
    }
    res.user = user
    next()

}




router.post('/signup', async(request, response) => {
        const signupFromUser = new signupTemplatesCopy({
            name: request.body.name,
            userType: request.body.userType,
            ID: request.body.ID,
            wallet: 1000
        })
        signupFromUser.save()
            .then(data => {
                response.json(data)
            })

    }) // when a user enters every data to buy a plot and click 'send'- a post request has been made and come to this server,method.


module.exports = router