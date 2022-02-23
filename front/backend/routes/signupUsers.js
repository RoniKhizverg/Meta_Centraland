const express = require('express')
const router = express.Router()
const signupTemplatesCopy = require('../models/signupUser') //import the shceme we have created
const bcrypt = require('bcrypt');
var rsa = require('node-rsa');


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
router.get("/:id", getUser, (req, res) => {
    res.json(res.user)
})



router.patch('/:id', getUser, async(req, res) => {

    if (req.body.privateKey != null) {
        res.user.privateKey = req.body.privateKey
    }
    if (req.body.publicKey != null) {
        res.user.publicKey = req.body.publicKey
    }
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.ID != null) {
        res.user.ID = req.body.ID
    }
    if (req.body.userType != null) {
        res.user.userType = req.body.userType
    }
    if (req.body.password != null) {
        res.user.password = req.body.password
    }
    if (req.body.wallet != null) {
        res.user.wallet = req.body.wallet
    }
    try {
        const updateuser = await res.user.save() //the updated version of our plot if they successfully saved 
        res.json(updateuser)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })

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


async function getUserFromSignup(req, res, next) {
    let user;
    try {
        user = await signupTemplatesCopy.find()
        if (user == null) {
            return res.json({
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

router.post('/signup', getUserFromSignup, async(request, response) => {

        const signup = await response.user;
        for (let i = 0; i < signup.length; i++) {

            if (signup[i].ID == request.body.ID) {

                return response.send('You already have account!')
            }
        }

        const saltPassword = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(request.body.password, saltPassword)
            // const key = new NodeRSA({ b: 1024 });
            // var encryptedString = key.encrypt

        var key = new rsa().generateKeyPair();
        const privateKey = key.exportKey("private");
        const publicKey = key.exportKey("public");
        const name = request.body.name;
        const ID = request.body.ID;
        const password = securePassword;
        // const password = request.body.password;
        // const privateKey;
        // const publicKey;
        const wallet = 1000;

        const newUser = new signupTemplatesCopy({
            privateKey,
            publicKey,
            name,
            ID,
            password,
            wallet
        })

        newUser.save()
            .then(data => {
                response.json(data)
            })

    }) // when a user enters every data to buy a plot and click 'send'- a post request has been made and come to this server,method.


module.exports = router