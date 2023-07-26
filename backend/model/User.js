const mongoose =require('mongoose')

const { Schema } = mongoose;        //Schema name ka aik object bana rahe hai !!

const UserSchema = new Schema({     

    name: {
        type: String,
        required: true
    },

    location: {

        type: String,
        required: true
    },

    email: {

        type: String,
        required: true
    },

    password: {

        type: String,
        required: true
    },

    date: {

        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('user', UserSchema)    // user name ka collection ban jayega database me !!
