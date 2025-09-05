const mongoose = require('mongoose');
const  {addInterest}  = require('./controllers/investController'); // Adjust path
const dotenv = require("dotenv")
dotenv.config({path: "./config/index.env"})
const Db = process.env.DATABASE
mongoose.connect(Db, {
    /*     useNewUrlParser: true,
        useUnifiedTopology: true */
    }).then(()=>{
        console.log("MongoDB Connected!")
})

const investmentId = '67f266a85cdd980e4b694459';

addInterest(investmentId).then(() => {
    console.log('✅ Done');
    mongoose.disconnect();
});
