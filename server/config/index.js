let config = {};

config.PORT = process.env.PORT || 4000;

config.api = {
    root: 'api',
    url: 'execute',
}

module.exports = config;