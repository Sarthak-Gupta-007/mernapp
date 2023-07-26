const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://sarthak:mernstack@cluster0.c0lvvuc.mongodb.net/gofood?retryWrites=true&w=majority'

const mongoDB = () => {

    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {

        if (err) console.log("---", err)

        else {
            console.log("connected")

            const fetched_data = await mongoose.connection.db.collection("food_items")
            fetched_data.find({}).toArray(async function ( err, data) {       


                const foodCategory=await mongoose.connection.db.collection("food_category")
                foodCategory.find({}).toArray(function ( err, catData){

                    if(err)
                    console.log(err);

                    else
                    {
                        global.food_items = data;       // by creating a global variable you can update/use it anywhere in our application.
                        global.food_categories=catData;
       
                    }

                })
            })
        }
    });

}

module.exports = mongoDB;

