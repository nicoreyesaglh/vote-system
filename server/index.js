const express = require('express');
const config = require('./config');

const app = express();

app.listen(config.PORT, () => {
    console.log('Server is running on http://localhost:' + config.PORT);
});
    