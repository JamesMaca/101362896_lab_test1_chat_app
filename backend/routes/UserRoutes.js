const express = require('express');
const User = require('../models/User');
const cors = require('cors');

const router = express.Router();
router.use(cors());

router.post('/signup', async (req, res) => {
    try{
        const newUser = new User(req.body);
        await newUser.save();
        console.log("New User created: " + newUser + "\n------------------------------------------------------------------------------------------------------------------")
        res.status(201).send(newUser);
    }catch(err){
        res.status(500).send(err.message);
    }
})

router.post('/login', async (req, res) => {
    const {username, password} = req.query

    try{
        const user = await User.findOne({ $or: [{ username: username }, { email: username }] })
        if(user){
            if(password == user.password){
                console.log("USER LOOGED IN: " + user)
                res.send({
                    username: username,
                    password: password
                })
            }else{
                res.status(401).send({
                    status: false,
                    message: 'Invalid Username and/or password'
                })
            }
        }else{
            res.status(401).send({
                status: false,
                message: 'Invalid Username and/or password'
            })
        }

    }catch(error){
        res.status(500).send(error)
    }
})


module.exports = router