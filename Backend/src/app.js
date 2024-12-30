const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

// Load environment variables
dotenv.config({ path: './config/.env' });
require('./db/mongoose');

const adminRoutes = require('./routers/adminRoutes');
const candidateRoutes = require('./routers/candidateRoutes');

const app = express();
const port = process.env.PORT

// Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// Swagger documentation
require('./swagger/swagger')(app);

// Routes
app.use(adminRoutes);
app.use(candidateRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to Candidate Management System');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
