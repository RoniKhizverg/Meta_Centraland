const mongoose = require('mongoose') //allow us to create a model which we can use to interact with the database in a easy way

//javascript object and this object is going to have keys for all different properties of our places
const placesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true //we always want the name to be required!
    },
    country: {
        type: String,
        required: true //we always want the name of the country to be required!
    },
    description: {
        type: String,
        required: true //we always want the description to be required!
    },

    images: [String]
});
module.exports = mongoose.model('Place', placesSchema) //this model function takes 2 properies
    //when we export this and import in a different file this model allow us to interact directly with the the database using this schema