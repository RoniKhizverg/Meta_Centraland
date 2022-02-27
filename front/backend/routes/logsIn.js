const express = require('express')
const router = express.Router()
const logTemplatesCopy = require('../models/log-In') //import the shceme we have created
const signUpScheme = require('../models/signupUser')
const bcrypt = require('bcrypt');


router.get('/', async(req, res) => { //get all the users that registered
    try {
        const signup = await logTemplatesCopy.find()
        res.json(signup)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

})
router.get("/:id", (req, res) => { //get user according _id
    res.json(res.user)
})


router.delete('/:id', getUser, async(req, res) => { //delete user accroding _id 
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
async function getUser(req, res, next) { //function to find the specific user we want according _id
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

async function getUserFromSignup(req, res, next) { //get the specific user that did signup according his _id
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

router.post('/login', getUserFromSignup, async(request, response) => { // post the user in login's database         
    let login = '';
    const updateuser = await response.user; //list of all registered users

    for (let i = 0; i < updateuser.length; i++) {

        if (updateuser[i].ID == request.body.ID) {

            login = updateuser[i];
        }
    }
    if (request.body.ID != login.ID) { // the user has never registered before and therefore cant register
        return response.send('Cannot find User')

    }
    try {
        const verify_password = await bcrypt.compare(request.body.password, login.password); //compare with the encrypted password
        if (verify_password === true) { // post the user in login's database
            const ID = request.body.ID;
            const password = login.password;
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
        } else { //right ID but wrong password
            return response.send('wrong password!')
        }
    } catch {
        response.status(500).send()
    }
})



module.exports = router