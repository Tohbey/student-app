const config = require('config');

module.exports = function (params) {
    if (!config.get('jwtPrivateKey')) {
        console.error('FATAL ERROR: jwtKey is not defined.');
        process.exit(1);
    }
}