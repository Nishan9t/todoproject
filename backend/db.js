const mongoose = require('mongoose');

const mongoDbConnection=async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/todoproject')
        console.log('db connected')
    }
    catch(err)
    {
        console.log(err);
    }
    

}

module.exports = mongoDbConnection;
