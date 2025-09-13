const mongoose = require('mongoose');
const colors   = require('colors');

const connectDB = async () => {
    try{
        await  mongoose.connect(process.env.DB_CONNE_STR);
        console.log(`Database connect successfully ${mongoose.connection.host}`.bgYellow);
    }catch(error){
        console.log(`Database connection failed ${error}`.bgRed);
    }
}

module.exports = connectDB;