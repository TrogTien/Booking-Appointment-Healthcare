const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const db = require('./config/db/mongoose');
const route = require('./routes');

const app = express();

dotenv.config();

// Connect MongoDB
db.connect();
// Init Route
app.use(morgan('combined'));                            // HTTP logger

app.use(express.json());                                // phân tích dữ liệu gửi đến dưới dạng JSON lưu trong req.body
app.use(cors({ origin: true, credentials: true }));

app.use((req, res, next) => {
    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    )

    next();
})


route(app);



app.listen(3000, () => {
    console.log('App listening on port 3000')
})