const express = require('express');
const config = require('./config');
const router = require('./api');

const app = express();

app.listen(config.PORT, () => {
    console.log('Server is running on http://localhost:' + config.PORT);
});

app.use(router);
    