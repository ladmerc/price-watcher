'use strict';

const PriceCheck = require('mongoose').model('PriceCheck');
const config = require('../config');
const logger = require('../config/log');
const mailer = require('../utils/mailer')
const api = require('../utils/api');

const fetch = require('isomorphic-fetch');

module.exports =  (agenda) => {
  agenda.define(config.priceCheckJob, async (job, done) => {
    const { zincBaseUrl, amazonProductId } = config;
    const url = `${zincBaseUrl}/v1/products/${amazonProductId}?retailer=amazon`;
    const headers = {
      'Authorization': `Basic ${Buffer.from(config.zincToken + ':').toString('base64')}`
    }

    try {
      const result = await api.get(url, { headers });
      PriceCheck.create({
        productId: amazonProductId,
        price: result.price
      })
      .then(async (doc) => {
        // get and compare price at last check
        let lastDoc;
        try {
          lastDoc = await PriceCheck
            .findOne({
              _id: { $ne: doc._id }
            })
            .sort({ createdAt: -1 })
            .lean();
            console.log(lastDoc);
   
          if (lastDoc && lastDoc.price > doc.price) {
            return mailer.send({
              from: 'ladna_from@mailinator.com',
              to: 'zinc_to@mailinator.com',
              subject: 'Price Drop',
              text: `Amazon Product ${amazonProductId} recently dropped price from ${lastDoc.price / 100} to ${doc.price / 100}`
            });
          }
          
        } catch (e) {
          logger.info(`${config.priceCheckJob} couldn't get last check for job #${job.attrs._id}: ${e}`);
          return Promise.resolve()
        }
      })
      .then((info) => {
        if (info) {
          logger.info(`${config.priceCheckJob} Success for job #${job.attrs._id}: ${e}`);
          console.log(mailer.getPreviewUrl(info));
        }

        done();
      })
      .catch(e => {
        logger.error(`${config.priceCheckJob} Error for job #${job.attrs._id}: ${e}`);
        done(e);
      });
    } catch(e) {
      logger.error(`${config.priceCheckJob} Error for job #${job.attrs._id}: ${e}`);
      return done(e)
    }

  })
};