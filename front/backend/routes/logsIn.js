const express = require('express')
const router = express.Router()
const logTemplatesCopy = require('../models/log-In') //import the shceme we have created
const signUpScheme = require('../models/signupUser')
const bcrypt = require('bcrypt');


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

async function getUserFromSignup(req, res, next) {
    let user;
    try {
        user = await signUpScheme.find()
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

router.post('/login', getUserFromSignup, async(request, response) => {
    let login = '';
    const updateuser = await response.user;

    for (let i = 0; i < updateuser.length; i++) {

        if (updateuser[i].ID == request.body.ID) {

            login = updateuser[i];
        }
    }
    if (request.body.ID != login.ID) {
        return response.send('Cannot find User')

    }
    try {
        const verify_password = await bcrypt.compare(request.body.password, login.password);
        if (verify_password === true) {
            console.log("hi");
            const ID = request.body.ID;
            const password = login.password;
            const userType = request.body.userType;

            console.log(login)
            const user = new logTemplatesCopy({
                ID,
                password,
                userType

            })

            user.save()

            .then(data => {
                response.json(data)
            })
        } else {
            return response.send('wrong password!')
        }
    } catch {
        response.status(500).send()
    }
})



module.exports = router