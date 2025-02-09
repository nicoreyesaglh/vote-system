const express = require('express');
const config = require('./config');
const router = require('./api');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.listen(config.PORT, () => {
    console.log('Server is running on http://localhost:' + config.PORT);
});

//permite que el servidor reciba solicitudes de cualquier origen
app.use(cors());
//permite que el servidor reciba solicitudes con formato JSON
app.use(express.json());

app.use(`/${config.api.root}/${config.api.url}/`, router);
    