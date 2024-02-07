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

module.exports = router