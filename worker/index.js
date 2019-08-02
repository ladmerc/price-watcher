'use strict';

const Agenda = require('agenda');
const config = require('../config')
const logger = require('../config/log')

const localDb = 'mongodb://' + (config.dbHost || 'localhost') + '/' + config.dbName;
const mongoConnectionString = config.isProduction ? process.env.MONGODB_URI : localDb;
const agenda = new Agenda({db: { address: mongoConnectionString, collection: 'jobs',  }});
agenda.maxConcurrency = 2
agenda.processEvery = '1 minute'


require('./price-check-job')(agenda);

agenda.on('ready', function() {
  agenda.start();
  agenda.every(`${config.backgroundCheckInterval} minutes`, config.priceCheckJob);
});

const graceful = () => {
  agenda.stop(function() {
    logger.error('Agenda failed to start');
    process.exit(0);
  });
}
  
process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

module.exports = agenda;