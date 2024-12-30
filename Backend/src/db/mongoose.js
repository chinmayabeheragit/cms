const mongoose = require('mongoose');

// Replace the below connection options with only `dbName` if required.
mongoose.connect(process.env.MONGODB_URL, {
    dbName: 'cms',
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
