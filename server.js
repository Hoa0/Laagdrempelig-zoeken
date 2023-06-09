const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');

// Set the port for the server to listen on
const port = process.env.PORT || 3002;

// Set up middleware to serve static files
app.use(express.static(path.resolve('public')));

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