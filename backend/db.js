const mongoose = require('mongoose');

const mongoDbConnection=async()=>{
    try{
        await mongoose.connect(`mongodb+srv://nishant:nishant@cluster0.96cdwkv.mongodb.net/todoproject?retryWrites=true&w=majority`)
        console.log('db connected')
    }
    catch(err)
    {
        console.log(err);
    }
    

}

module.exports = mongoDbConnection;
