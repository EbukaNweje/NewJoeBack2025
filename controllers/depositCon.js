const msgModel = require("../models/msgModel")
const historyModel = require("../models/historyModel")
const userModel = require("../models/User")
const depositModel = require("../models/depositModel")
// const currencyapi = require('@everapi/currencyapi-js');
require("dotenv").config()
const axios = require('axios');
const User = require("../models/User")

// Deposit function
exports.deposit = async (req, res) => {
    try {
        // Get the depositor's id
        const { id } = req.params;

        // Find the depositor
        const depositor = await userModel.findById(id);

        // Get the details for transaction
        const { amount, coin } = req.body;
        const newAmount = Number(amount);

        // Check if the amount is within the allowed range
        if (newAmount <= 0 || newAmount > 9999999 || newAmount === NaN) {
            return res.status(400).json({
                message: 'You can only deposit between 0 and 9,999,999'
            });
        }

        if (coin != "BTC" && coin != "ETH") {
            return res.status(404).json({
                message: `Coin not available`
            });
        }

        // Perform the currency conversion
        let response;
        let roundedNumber;

        if (coin == "BTC") {
            response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&precision=5`);
            const conversionRates = response.data.bitcoin.usd;
            const myTotal = Number(conversionRates);
            const btcAmount = newAmount / myTotal;
            roundedNumber = btcAmount.toFixed(9);
        } else if (coin == "ETH") {
            response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&precision=5`);
            const conversionRates = response.data.ethereum.usd;
            const myTotal = Number(conversionRates);
            const btcAmount = newAmount / myTotal;
            roundedNumber = btcAmount.toFixed(9);
        }

        const Depo = await depositModel.find()

        // Save the deposit details
        const deposit = new depositModel({
            user: depositor._id,
            amount: `${newAmount}`,
            coin: coin,
            total: roundedNumber,
            status: 'pending',
            transactionType: Depo.transactionType,
        });
        await deposit.save();

        
        deposit.user = id
        // Save the transfer id to the user
        depositor.Transactions.deposits.push(deposit._id);
        await depositor.save();


        if(deposit.status === 'pending'){
            return res.status(200).json({
                message: `Deposit made and pending`
            })
        }
        if(deposit.status === 'confirmed'){
        // Add the deposited amount to the user's account balance
        depositor.accountBalance += newAmount;
        }

        // Create a transaction history for the depositor and save
        const History = new historyModel({
            id: depositor._id,
            transactionType: deposit.transactionType,
            amount: `${newAmount}`,
        });
        await History.save();

        // Create a notification message for the depositor and save
        if (deposit) {
            const msg = `Hi ${depositor.fullName}, you just deposited ${newAmount} to your balance in ${coin}`;
            const message = new msgModel({
                id: depositor._id,
                msg
            });
            await message.save();
        }

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


exports.getAllDeposits = async (req, res) => {
    try {
        // Find all deposit records and populate the user field to get user information
        const deposits = await depositModel.find().populate('user');

        if (!deposits || deposits.length === 0) {
            return res.status(404).json({
                message: 'No deposit records found'
            });
        }

        // Return the retrieved deposit records with user information
        res.status(200).json({ data: deposits });
    } catch (error) {
        // Handle errors
        console.error('Error fetching deposits:', error);
        res.status(500).json({ error: 'Internal server error' });
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
