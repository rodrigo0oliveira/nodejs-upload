const mongoose = require('mongoose');

const createConnection = async ()=>{
    try{

        await mongoose.connect(process.env.MONGO_URL);
        console.log('Mongo connected');
    }catch(error){
        console.error(error.message);
    }
}

module.exports = createConnection();