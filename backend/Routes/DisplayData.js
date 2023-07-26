const express = require('express')
const router = express.Router()

router.post('/foodData',(req,res)=>{            //foodData name ka endpoint jo ki front end se hit hoga !!
 
    try{
        res.send([global.food_items,global.food_categories])

    }catch(error){
        console.error(error.message);
        res.send("Server Error");
    }
})

module.exports=router;