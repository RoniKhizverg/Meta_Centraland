const express = require('express')
const router = express.Router()
const signupTemplatesCopy = require('../models/signupUser') //import the shceme we have created
const bcrypt = require('bcrypt');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const crypto = require('crypto');
const { format } = require('path');

router.get('/', async(req, res) => { //get the all users who have registered(sign up)
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
router.get("/:id", getUser, (req, res) => { //get the user according _id
    res.json(res.user)
})



router.patch('/:id', getUser, async(req, res) => { // update users's details

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
        const updateuser = await res.user.save()
        res.json(updateuser)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })

    }


})





router.delete('/:id', getUser, async(req, res) => { //delete user
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
async function getUser(req, res, next) { //get the current register user
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


async function getUserFromSignup(req, res, next) { //get the list of the reigstered users
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
router.post('/verify', (req, res) => { //verify if the hash of the data equals to the signature
    let { data, publicKey, signature } = req.body
    publicKey = crypto.createPublicKey({
        key: Buffer.from(publicKey, 'base64'),
        type: 'spki',
        format: 'der',

    })

    const sign = JSON.stringify(signature)
    const verify = crypto.createVerify("SHA256")
    verify.update(data)
    verify.end()

    let result = verify.verify(publicKey, Buffer.from(signature, 'base64'))

    res.send(
        result)

})


router.post('/seller', async(req, res) => { //create the signature
    users = await signupTemplatesCopy.find();
    const userid = req.body.userid
    let privateKey = []


    for (var i = 0; i < users.length; i++) {
        if (users[i].ID === userid) {
            privateKey = users[i].privateKey
        }
    }

    privateKey = crypto.createPrivateKey({
        key: Buffer.from(privateKey, 'base64'),
        type: 'pkcs8',
        format: 'der',
    })

    const sign = crypto.createSign('SHA256')
    const hashData = req.body.hash
    sign.update(hashData)
    sign.end()
    const signature = sign.sign(privateKey).toString('base64')

    res.send(signature)



})


router.post('/signup', getUserFromSignup, async(request, response) => { //create new register user

    const signup = await response.user; //get the list of all registered users
    for (let i = 0; i < signup.length; i++) {

        if (signup[i].ID == request.body.ID) {

            return response.send('You already have account!')
        }
    }

    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(request.body.password, saltPassword) //password encryption
    let { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { //creating the keys
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'der',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'der',
        },

    })

    publicKey = publicKey.toString('base64') //convert to format 'base64'
    privateKey = privateKey.toString('base64')

    const name = request.body.name;
    const ID = request.body.ID;
    const password = securePassword;
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

})


module.exports = router