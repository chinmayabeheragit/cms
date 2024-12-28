const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

const adminRoutes = require('./routers/adminRoutes');
const candidateRoutes = require('./routers/candidateRoutes');

dotenv.config({path: './config/.env'})
require('./db/mongoose');

const app = express();
app.use(cors({
    origin: '*'
}))

const port = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
require('./swagger/swagger')(app);
app.use(helmet());
app.use(cors());

app.use(adminRoutes);
app.use(candidateRoutes);

app.get('/', (req,res) => {
    res.send('Welcome to Candidate Management System');
})

app.listen(port, () => {
    console.log(`server is runnig on port http://localhost:${port}`)
})