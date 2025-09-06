const msgModel = require("../models/msgModel");
const historyModel = require("../models/historyModel");
const userModel = require("../models/User");
const depositModel = require("../models/depositModel");
// const currencyapi = require('@everapi/currencyapi-js');
require("dotenv").config();
const axios = require("axios");
const User = require("../models/User");

// Deposit function
exports.deposit = async (req, res) => {
  try {
    // Get the depositor's id
    const { id } = req.params;

    // Find the depositor
    const depositor = await userModel.findById(id);
    if (!depositor) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Get the details for transaction
    const { amount, coin } = req.body;
    const newAmount = Number(amount);

    // Check if the amount is within the allowed range
    if (newAmount <= 0 || newAmount > 9999999 || isNaN(newAmount)) {
      return res.status(400).json({
        message: "You can only deposit between 0 and 9,999,999",
      });
    }

    if (!["BTC", "ETH", "BNB", "DOGE", "SOL"].includes(coin)) {
      return res.status(404).json({
        message: `Coin not available`,
      });
    }

    // Perform the currency conversion
    const coinGeckoIds = {
      BTC: "bitcoin",
      ETH: "ethereum",
      BNB: "binancecoin",
      DOGE: "dogecoin",
      SOL: "solana",
    };

    // Get current price from CoinGecko
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoIds[coin]}&vs_currencies=usd&precision=5`
    );

    if (!response.data || !response.data[coinGeckoIds[coin]]) {
      return res.status(500).json({
        message: "Error fetching cryptocurrency price",
      });
    }

    const conversionRates = response.data[coinGeckoIds[coin]].usd;
    const myTotal = Number(conversionRates);
    const cryptoAmount = newAmount / myTotal;
    const roundedNumber = cryptoAmount.toFixed(9);

    // Save the deposit details
    const deposit = new depositModel({
      user: depositor._id,
      amount: newAmount,
      coin: coin,
      total: roundedNumber,
      status: "pending",
      transactionType: "Deposit",
    });
    await deposit.save();

    // Save the transfer id to the user
    depositor.Transactions.deposits.push(deposit._id);
    await depositor.save();

    // Create a transaction history
    const History = new historyModel({
      id: depositor._id,
      transactionType: "Deposit",
      amount: newAmount,
    });
    await History.save();

    // Create a notification message
    const msg = `Hi ${depositor.userName}, you just deposited ${newAmount} to your balance in ${coin}`;
    const message = new msgModel({
      id: depositor._id,
      msg,
    });
    await message.save();

    return res.status(200).json({
      message: "Deposit made and pending",
      deposit: deposit,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getAllDeposits = async (req, res) => {
  try {
    // Find all deposit records and populate the user field to get user information
    const deposits = await depositModel.find().populate("user");

    if (!deposits || deposits.length === 0) {
      return res.status(404).json({
        message: "No deposit records found",
      });
    }

    // Return the retrieved deposit records with user information
    res.status(200).json({ data: deposits });
  } catch (error) {
    // Handle errors
    console.error("Error fetching deposits:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// // Controller function to fetch all deposits of every user
// exports.getAllDeposits = async (req, res) => {

// try {
//     // Find all users
//     const users = await userModel.find();

//     // Create an array to store user deposits
//     const userDeposits = [];

//     // Iterate over each user
//     for (const user of users) {
//       // Populate deposits for the current user
//       await user.populate('Transactions.deposits').execPopulate();

//       // Extract user's full name, email, and deposits
//       const { fullName, email, Transactions: { deposits } } = user;

//       // Push the user's full name, email, and deposits to the array
//       userDeposits.push({ fullName, email, deposits });
//     }
//     console.log(userDeposits)

//     // Send the array of user deposits as the response
//     res.status(200).json({userDeposits});
//   } catch (error) {
//     console.error('Error fetching deposits:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }

// }
