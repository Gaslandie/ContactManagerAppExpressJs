const express = require('express');
require('dotenv').config();
const contactRoutes = require('./routes/contactRoutes');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/dbConnection');

connectDB();
const app = express();

//middlewares
app.use(express.json())

//routes
app.use('/api/contacts',contactRoutes);

//global error handler
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})