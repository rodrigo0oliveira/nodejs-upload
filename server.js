require('dotenv').config();
const express = require('express');
const createConnection = require('./src/database/db');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
createConnection;
const PORT = process.env.PORT;

app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/admin',adminRoutes);

app.listen(PORT,()=>{
    console.log('Server is running');
})