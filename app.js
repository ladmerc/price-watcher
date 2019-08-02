'use strict';

require('dotenv').config();
require('./db').connect();
require('./utils/mailer').init()

// register models
require('./models');

require('./worker');


module.exports = (req, res) => {
	res.end('OK');
};
