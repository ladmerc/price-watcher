'use strict';

const mongoose = require('mongoose');

const PriceCheck = new mongoose.Schema({
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: [true, 'is required'],
  },
	productId: {
    type: String,
    required: [true, 'is required'],
  }
}, { timestamps: true });

mongoose.model('PriceCheck', PriceCheck);
