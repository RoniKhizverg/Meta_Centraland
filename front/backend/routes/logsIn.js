const express = require('express')
const router = express.Router()
const logTemplatesCopy = require('../models/log-In') //import the shceme we have created


router.get('/', async(req, res) => {
    try {
        const signup = await logTemplatesCopy.find()
        res.json(signup)
    } catch (err) {
        res.status(500).json({
                message: err.message
            }) // if there is a error we want to send that to the user as json because this is a json api
            //500 error means that there is an error on our server(our fault)
    }

})
router.get("/:id", (req, res) => {
    res.json(res.user)
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
        user = await logTemplatesCopy.findById(req.params.id)
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

router.route('/login').post(async(request, response) => {


    const ID = request.body.ID;
    const password = request.body.password;
    const userType = request.body.userType;


    const user = new logTemplatesCopy({
        ID,
        password,
        userType

    })

    user.save()
        .then(data => {
            response.json(data)
        })

})


module.exports = router