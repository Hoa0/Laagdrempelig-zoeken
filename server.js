const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const bodyParser = require('body-parser');

// Set the port for the server to listen on
const port = process.env.PORT || 3002;

const apiRoutes = require('./routes/routes');

// Set up middleware to serve static files
// Parse JSON bodies
app.use(bodyParser.json());
app.use(express.static(path.resolve('public')));
app.use('/api', apiRoutes);

// Set the view engine to ejs and set the views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Set up a route
app.get('/', (req, res) => {
    res.render('index.ejs');
});

http.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});