if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const morgan = require('morgan');
const blogsRoutes = require('./routes/blogs');
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

//mongoose-mongodb
require('./db/connection');

// Router
app.use('/blogs', blogsRoutes);

// Catch 404 errors
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

// Error handler function
app.use((err, req, res, next) => {

    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    //respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    // respond to server
    console.error(err);
})

//start the server
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`listening on ${port}...`) });