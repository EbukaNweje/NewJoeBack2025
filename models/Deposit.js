const mongoose = require('mongoose');

const DepositSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },

  paymentMethod: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
 
}, {timestamps: true});

module.exports = Deposit = mongoose.model('Deposit', DepositSchema )

