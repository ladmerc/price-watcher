'use strict';

const mongoose = require('mongoose'),
	logger = require('../config/log');

module.exports =  {
	connect: function() {
		if (!process.env.MONGODB_URI) {
			logger.error('missing MongoDB URI');
			throw new Error('missing DB URI');
		}
		mongoose.connect(process.env.MONGODB_URI, { 
			keepAlive: true,
			useNewUrlParser: true
		});


		mongoose.connection.on('error', (error) => {
			logger.error('MongoDB Connection Error: ');
			logger.error(`${error.stack || error}`);
			process.exit(1);
		});
	}
}