require('dotenv').config(); //use the dotenv library at the beginning to load all our environment variables from dotenv 
const express = require('express'); //going to pulling te express library
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express(); //run express functions so we can use to configure our server
const mongoose = require('mongoose'); //to configure Monogoose to connect to out MongoDb

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}); //to link our database that our database to the mongoose
const db = mongoose.connection; //can conect some events to run when our database is connected
db.on('error', error => console.error(error)); //allow us to see if there is a problem connecting data base.
db.once('open', () => console.log('connected to Database'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.json()) //let our server to accept json as a body

const signupRouter = require('./routes/signupUsers'); //to route all of our places information
const plotsRouter = require('./routes/plots'); //to route all of our places information
app.use('/plots', plotsRouter) //we want to use this whenever we query places
app.use('/signupUsers', signupRouter)
app.listen(process.env.PORT, () => console.log('Server started')); //tell what the port we want to listen on in our case-8080 when the server ges started.