const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
// const router = require('./routes/api/members');

const app = express();

// initialize middleware
// app.use(logger);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// middleware
// set public as static folder
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use('/api/members', require('./routes/api/members'));


// app.get('/', (req, res) => {
    // res.send("<h1>Hello World!!!</h1>");
    // res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT ${PORT}...`);
});