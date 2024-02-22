const express = require('express');
require('dotenv').config();
const contactRoutes = require('./routes/contactRoutes');

const app = express();
app.use('/api/contacts',contactRoutes);


const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})