'use strict';

const nodemailer = require('nodemailer');
let transporter;

module.exports = {
  init: async () => {
    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  },
  send: async (opts) => {
    if (!transporter) {
      return Promise.reject('transport not created yet');
    }

    return transporter.sendMail(opts);
  },
  getPreviewUrl: (info) => nodemailer.getTestMessageUrl(info)
};