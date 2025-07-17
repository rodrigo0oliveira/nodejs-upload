require('dotenv').config();
const express = require('express');
const createConnection = require('./src/database/db.js');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const adminRoutes = require('./src/routes/admin.routes');

const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./src/docs/swagger/swagger.js');

const cors = require('cors');

const app = express();
createConnection;
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/admin',adminRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})