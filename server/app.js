const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const db = require('./config/db/mongoose');
const route = require('./routes');

const app = express();

// Connect MongoDB
db.connect();
// Init Route

app.use(express.json());                                // phân tích dữ liệu gửi đến dưới dạng JSON lưu trong req.body
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('combined'));                            // HTTP logger

route(app);



app.listen(3000, () => {
    console.log('App listening on port 3000')
})