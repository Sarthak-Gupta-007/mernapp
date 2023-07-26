const express = require('express')
const router = express.Router()
const User = require('../model/User')
const { body, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken")
const jwtSecret = "MynameisEndToEndYoutubeChannel$#"


const   bcrypt = require ("bcryptjs");   


router.post("/createuser",                  // basically these are the end points..(receiving requests and sending responses)

    body('email').isEmail(),               // body('email') basically req.body.email hi hai bas ham yaha validation se check kar rahe hai !!
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect password').isLength({ min: 5 }),

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const salt = await bcrypt.genSalt(10);      //mostly bcrypt ke functions asynchronous hote hai, isiliye await use karna padta hai.. matlab ki promise return karte hai 
        let secPassword= await bcrypt.hash(req.body.password,salt);   //hashing of passwords 

        try {

            let em = req.body.email;
            let xx = await User.findOne({ em });   
            
            if(!xx)
            {
                return res.status(400).json({ errors: "Already a user" });
            }
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })

        } catch (error) {

            console.log("error")
            res.json({ success: false });
        }

    })



router.post("/loginuser",           // basically a end point        

    body('email').isEmail(),         // body('email') basically req.body.email hi hai bas ham yaha validation se check kar rahe hai !!
    body('password', 'Incorrect password').isLength({ min: 5 }),

    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;

        try {
            let userData = await User.findOne({ email });        //findOne agar email available hogi to poora data throw kardega userData me !!
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials (Invalid Email)" });
            }

            const pwdcompare = await bcrypt.compare(req.body.password,userData.password)  //comparing the entered pass with hash pass

            if (!pwdcompare) {
                return res.status(400).json({ errors: "Try logging with correct credentials (Invalid Password)" });
            }   
            
            const data = {
                user:{
                    id: userData.id
                }
            }
            const authToken=jwt.sign(data,jwtSecret)
            res.json({ success: true,authToken: authToken})

        } catch (error) {

            console.log("error")
            res.json({ success: false });
        }

    })

module.exports = router; 