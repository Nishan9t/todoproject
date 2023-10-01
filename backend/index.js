const express = require('express');
const cors = require('cors');
const route = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const mongoDbConnection = require('./db');
const todoRoute = require('./routes/todoRoutes');


const app= express();
app.use(cors(
    {
        origin:["https://todoproject-frontend.vercel.app"],
        methods:["POST","GET","DELETE","PUT"],
        credentials:true
    }
    ));

app.use(express.json())
app.use(cookieParser())


mongoDbConnection();

app.use('/',route);
app.use('/',todoRoute);

app.listen(8000,()=>{
    console.log('server is running on port 8000')
})
