// const UserModel = require('../models/User');
// const InvestModel = require('../models/invest');
// const plansModel = require('../models/plansModel');





// // Function to add 0.4% of the money invested after every 24 hours
// const addInterest = async (userId, planId, amount) => {
//     // Assuming you have a function to get the user's account balance
//     const user = await UserModel.findById(userId);

//     const plan = await plansModel.findById(planId);

//     // Calculate interest
//     const interest = amount * plan.percentageInterest; // 0.4% of the amount

//     // Add interest to the user's account balance
//     user.acctBalance += interest;
//     await user.save();

//     // Log the interest transaction
//     const interestTransaction = new depositModel({
//         user: userId,
//         amount: interest,
//         total: user.acctBalance
//     });
//     await interestTransaction.save();

//     // Log the interest transaction in history
//     const interestHistory = new historyModel({
//         userId,
//         transactionType: 'Interest',
//         amount: interest
//     });
//     await interestHistory.save();

//     // Log a notification message for the user
//     const notificationMessage = `Hi ${user.userName}, you earned ${interest} interest on your ${coin} deposit.`;
//     const message = new msgModel({
//         userId,
//         msg: notificationMessage
//     });
//     await message.save();
// };



// exports.makeInvestment = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { planId, amount } = req.body;

//         // Find the user and check if they have enough balance
//         const user = await UserModel.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         if (user.accountBalance < amount) {
//             return res.status(400).json({ message: 'Insufficient balance' });
//         }

//         // Deduct the amount from the user's balance
//         user.accountBalance -= amount;
//         await user.save();

//         // Create the investment record
//         const investment = new InvestModel({
//             plan: planId,
//             amount: amount,
//             transactionType: user.transactionType
//         });
//         await investment.save();

//         // Update the user's total investment
//         user.totalInvestment += amount;
//         await user.save();

//         user.investmentPlan.push(investment._id)

//          // Save the transfer id to the user
//          user.Transactions.push(investment._id);
//          await user.save();
 
//          // Create a transaction history for the user and save
//          const History = new historyModel({
//              userId: user._id,
//              transactionType: investment.transactionType,
//              amount: `${amount}`,
//          });
//          await History.save();
 
//          // Create a notification message for the user and save
//          if (investment) {
//              const msg = `Hi ${user.fullName}, you just invested ${amount}.`;
//              const message = new msgModel({
//                  userId: user._id,
//                  msg
//              });
//              await message.save();
//          }
//           // Call the function to add interest after 24 hours
//             setInterval(() => {
//                 addInterest(userId, newAmount, planId);
//             },24 * 60 * 60  * 1000);


//         res.status(200).json({ message: 'Investment successful', data: investment });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



// const InterestModel = require('../models/InterestModel');
// const UserModel = require('../models/User');
// const InvestModel = require('../models/investModel');
// const PlansModel = require('../models/plansModel');
// const { addDays } = require('date-fns');
// const userPlanModel = require('../models/userPlanModel');
// const luxon = require('luxon')

// // Function to add 0.4% of the money invested after every 24 hours
// const addInterest = async (userId, planId, amount, totalDailyInterest) => {
//     try {
//         const user = await UserModel.findById(userId);
//         const plan = await PlansModel.findById(planId);
//         if (!user || !plan) {
//             throw new Error('User or plan not found');
//         }
         
//         let totalDailyInterest;
//         const interest = plan.percentageInterest  // Calculate interest

//         user.accountBalance += parseFloat(interest); // Add interest to the user's account balance
//         await user.save();

//         user.totalProfit += parseFloat(interest) ; // Add interest to the user's account balance
//         await user.save();

//         totalDailyInterest += parseFloat(interest);

//         // Log the interest transaction
//         const interestTransaction = new InterestModel({
//             user: userId,
//             plan: planId,
//             amount: interest,
//             transactionType: 'Interest'
//         });
//         await interestTransaction.save()

//         user.Transactions.interests.push(interestTransaction._id);

//         await user.save();

//         // Log the interest transaction in history
//         const history = new HistoryModel({
//             userId,
//             transactionType: 'Interest',
//             amount: interest
//         });
//         await history.save();

//         // Log a notification message for the user
//         const notificationMessage = `Hi ${user.fullName}, you earned ${interest} interest on your ${plan.planName} investment.`;
//         const message = new MsgModel({
//             userId,
//             msg: notificationMessage
//         });
//         await message.save();
//     } catch (error) {
//         console.error('Error adding interest:', error);
//     }
// };

// exports.makeInvestment = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { planId, amount, totalDailyInterest } = req.body;

//         const user = await UserModel.findById(userId);
//         const plan = await PlansModel.findById(planId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         if (!plan) {
//             return res.status(404).json({ message: 'plan not found' });
//         }

//         if (user.accountBalance < amount) {
//             return res.status(400).json({ message: 'Insufficient balance' });
//         }
//         if (amount < plan.minimumDeposit || amount > plan.maximumDeposit) {
//             return res.status(400).json({ message: `Amount must be between ${plan.minimumDeposit} and ${plan.maximumDeposit}` });
//         }

//         // Deduct the amount from the user's balance
//         user.accountBalance -= amount;
//         await user.save();



//         const { DateTime } = require('luxon');

//             // Get the current date and time
//             const currentDate = DateTime.now();

//             // Format the current date and time as a string
//             const formattedDate = currentDate.toLocaleString({
//             weekday: "short",
//             month: "short",
//             day: "2-digit",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit"
//             });
//         const formattedDateTime = DateTime.fromFormat(formattedDate, "EEE, MMM d, yyyy, h:mm a");

//         // Add 6 days to the formatted date
//         const endDateFormatted = formattedDateTime.plus({ days: plan.durationDays });
        
//         const endDate = endDateFormatted.toLocaleString({
//             weekday: "short",
//             month: "short",
//             day: "2-digit",
//             year: "numeric"
//           });

//         // Create the investment record
//         const investment = new InvestModel({
//             user: userId,
//             plan: planId,
//             Date,
//             amount: amount,
//             endDate,
//             returns: totalDailyInterest
//         });
//         await investment.save();
                
//         investment.user = userId

//         plan.investment = investment._id;
//         await plan.save();


//         // const userPlan = new userPlanModel({
//         //     plan: planId,
//         //     user: userId,
//         //     investment: investment._id
//         // })


//         // Create a new userPlan document for each investment
//         const userPlan = new userPlanModel({
//             plan: planId,
//             user: userId,
//             investment: [investment._id] 
//         });



//         await userPlan.save();
//         // Save the transfer id to the user
//         user.Transactions.investments.push(investment._id);
//         user.investmentPlan.push(userPlan._id);


//         // Update the user's total investment
//         user.totalInvestment += parseFloat(amount);
//         await user.save();

// // Schedule interest calculation based on the plan's duration
// const expirationDate = addDays(new Date(), plan.durationDays);
// const timeUntilExpiration = expirationDate - Date.now();
// const interval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// // Calculate the initial delay until the next 24-hour interval
// const initialDelay = timeUntilExpiration % interval;

// // Add interest immediately
// addInterest(userId, planId, amount);

// // Schedule interest calculation every 24 hours until the expiration date
// setInterval(() => {
//     addInterest(userId, planId, amount, totalDailyInterest);
// }, interval);



//         res.status(200).json({ message: 'Investment successful', data: investment });
//     } catch (error) {
//         console.error('Error making investment:', error);
//         res.status(500).json({ error: error.message });
//     }
// };



// const Bull = require('bull');
// const cron = require('node-cron');
// const InterestModel = require('../models/InterestModel');
// const UserModel = require('../models/User');
// const InvestModel = require('../models/investModel');
// const PlansModel = require('../models/plansModel');
// const userPlanModel = require('../models/userPlanModel');
// const { addDays } = require('date-fns');
// const luxon = require('luxon');


// const interestQueue = new Bull('interest-calculation');



// exports.makeInvestment = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { planId, amount } = req.body;

//         const { user, plan } = await validateInvestment(userId, planId, amount);
//         const investment = await createInvestment(user, plan, amount);
//         await scheduleInterestCalculations(investment);

//         res.status(200).json({ message: 'Investment successful', data: investment });
//     } catch (error) {
//         console.error('Error making investment:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// async function validateInvestment(userId, planId, amount) {
//     const user = await UserModel.findById(userId);
//     const plan = await PlansModel.findById(planId);

//     if (!user) throw new Error('User not found');
//     if (!plan) throw new Error('Plan not found');
//     if (user.accountBalance < amount) throw new Error('Insufficient balance');
//     if (amount < plan.minimumDeposit || amount > plan.maximumDeposit) {
//         throw new Error(`Amount must be between ${plan.minimumDeposit} and ${plan.maximumDeposit}`);
//     }

//     return { user, plan };
// }

// async function createInvestment(user, plan, amount) {
//     const currentDate = new Date();
//     const endDate = addDays(currentDate, plan.durationDays);

//     const investment = new InvestModel({
//         user: user._id,
//         plan: plan._id,
//         Date: currentDate,
//         amount: amount,
//         endDate: endDate,
//         returns: 0
//     });
//     await investment.save();

//     user.accountBalance -= amount;
//     user.totalInvestment += amount;
//     user.Transactions.investments.push(investment._id);
//     await user.save();

//     const userPlan = new userPlanModel({
//         plan: plan._id,
//         user: user._id,
//         investment: [investment._id]
//     });
//     await userPlan.save();

//     user.investmentPlan.push(userPlan._id);
//     await user.save();

//     return investment;
// }

// async function scheduleInterestCalculations(investment) {
//     interestQueue.add(
//         { investmentId: investment._id },
//         { repeat: { cron: '0 0 * * *' }, endDate: investment.endDate }
//     );
// }


// interestQueue.process(async (job) => {
//     const { investmentId } = job.data;
//     await calculateAndAddInterest(investmentId);
// });

// async function calculateAndAddInterest(investmentId) {
//     const investment = await InvestModel.findById(investmentId).populate('user plan');
//     if (!investment || investment.endDate <= new Date()) {
//         return;
//     }

//     const { user, plan, amount } = investment;
//     const dailyInterest = (plan.percentageInterest * amount) / 100;

//     user.accountBalance += dailyInterest;
//     user.totalProfit += dailyInterest;
//     investment.returns += dailyInterest;

//     await Promise.all([
//         user.save(),
//         investment.save(),
//         logInterestTransaction(user._id, plan._id, dailyInterest),
//     ]);
// }

// async function logInterestTransaction(userId, planId, amount) {
//     const interestTransaction = new InterestModel({
//         user: userId,
//         plan: planId,
//         amount: amount,
//         transactionType: 'Interest'
//     });
//     await interestTransaction.save();

//     await UserModel.findByIdAndUpdate(userId, {
//         $push: { 'Transactions.interests': interestTransaction._id }
//     });
// }


// // Set up a daily cron job to process all active investments
// cron.schedule('0 0 * * *', async () => {
//     const activeInvestments = await InvestModel.find({ endDate: { $gt: new Date() } });
//     for (const investment of activeInvestments) {
//         await calculateAndAddInterest(investment._id);
//     }
// });


const Bull = require('bull');
const cron = require('node-cron');
const InterestModel = require('../models/InterestModel');
const UserModel = require('../models/User');
const InvestModel = require('../models/investModel');
const PlansModel = require('../models/plansModel');
const userPlanModel = require('../models/userPlanModel');
const { addDays } = require('date-fns');
const luxon = require('luxon');
const transporter = require('../utilities/email');

const interestQueue = new Bull('interest-calculation');

exports.makeInvestment = async (req, res) => {
    try {
        const { userId } = req.params;
        const { planId, amount } = req.body;

        const { user, plan } = await validateInvestment(userId, planId, amount);
        const investment = await createInvestment(user, plan, amount);
        await scheduleInterestCalculations(investment);

        res.status(200).json({ message: 'Investment successful', data: investment });
    } catch (error) {
        console.error('Error making investment:', error);
        res.status(500).json({ message: error.message });
    }
};

async function validateInvestment(userId, planId, amount) {
    const user = await UserModel.findById(userId);
    const plan = await PlansModel.findById(planId);

    if (!user) throw new Error('User not found');
    if (!plan) throw new Error('Plan not found');
    if (user.accountBalance < amount) throw new Error('Insufficient balance');
    if (amount < plan.minimumDeposit || amount > plan.maximumDeposit) {
        throw new Error(`Amount must be between ${plan.minimumDeposit} and ${plan.maximumDeposit}`);
    }

    return { user, plan };
}

async function createInvestment(user, plan, amount) {
    const currentDate = new Date();
    const endDate = addDays(currentDate, plan.durationDays);

    const investment = new InvestModel({
        user: user._id,
        plan: plan._id,
        Date: currentDate,
        amount: amount,
        endDate: endDate,
        returns: 0,
        status: 'active'
    });
    await investment.save();

    user.accountBalance -= amount;
    user.totalInvestment += amount;
    user.Transactions.investments.push(investment._id);
    await user.save();

    const userPlan = new userPlanModel({
        plan: plan._id,
        user: user._id,
        investment: [investment._id]
    });
    await userPlan.save();

    user.investmentPlan.push(userPlan._id);
    await user.save();

    return investment;
}

async function scheduleInterestCalculations(investment) {
    const endDate = luxon.DateTime.fromJSDate(investment.endDate).plus({ days: 1 }).toJSDate();
    
    interestQueue.add(
        { investmentId: investment._id },
        { 
            repeat: { cron: '0 0 * * *' },
            endDate: endDate
        }
    );
}

interestQueue.process(async (job) => {
    const { investmentId } = job.data;
    const investment = await InvestModel.findById(investmentId).populate('user plan');
    
    if (!investment) {
        console.log(`Investment ${investmentId} not found`);
        return;
    }

    const currentDate = new Date();
    
    if (currentDate >= investment.endDate) {
        // Investment has expired
        const { user, plan } = investment;
        
        // Credit the final amount to the user's account
        // user.accountBalance += investment.amount + investment.returns;
        // user.totalInvestment -= investment.amount;
        await user.save();

        // Send expiration email
        await sendExpirationEmail(user, investment, plan);

        // Mark investment as completed
        investment.status = 'completed';
        await investment.save();

        // Remove the job from the queue
        await job.remove();
    } else {
        // Investment is still active, calculate interest
        await calculateAndAddInterest(investment);
    }
});

async function calculateAndAddInterest(investment) {
    if (!investment || investment.status !== 'active') {
        return;
    }

    const { user, plan, amount } = investment;
    const dailyInterest = (plan.percentageInterest * amount) / 100;

    user.accountBalance += dailyInterest;
    user.totalProfit += dailyInterest;
    investment.returns += dailyInterest;

    await Promise.all([
        user.save(),
        investment.save(),
        logInterestTransaction(user._id, plan._id, dailyInterest),
    ]);
}

async function logInterestTransaction(userId, planId, amount) {
    const interestTransaction = new InterestModel({
        user: userId,
        plan: planId,
        amount: amount,
        transactionType: 'Interest'
    });
    await interestTransaction.save();

    await UserModel.findByIdAndUpdate(userId, {
        $push: { 'Transactions.interests': interestTransaction._id }
    });
}

async function sendExpirationEmail(user, investment, plan) {
    const mailOptions = {
        from: process.env.USER,
        to: user.email,
        subject: 'Investment Expiration Notice',
        html: `
     
        <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
          body {
              margin: 0;
              padding: 0;
              font-family: Arial, Helvetica, sans-serif;
              background-color: whitesmoke;
          }
          .container {
              width: 100%;
              background-color: whitesmoke;
              padding: 0;
              margin: 0;
          }
          .header, .footer {
              width: 100%;
              background-color: #21007F;
              color: white;
              text-align: center;
          }
          .content {
              width: 100%;
              max-width: 600px;
              background-color: white;
              padding: 20px;
              margin: 20px auto;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .footer-content {
              padding: 20px;
              text-align: center;
          }
          .contact-info, .social-icons {
              display: inline-block;
              vertical-align: top;
              width: 48%;
              margin-bottom: 20px;
          }
          .social-icons img {
              width: 30px;
              margin: 0 5px;
          }
          .footer-logo img {
              width: 50px;
          }
          .footer-logo, .footer-info {
              text-align: center;
              margin-bottom: 20px;
          }
          .footer p {
              margin: 5px 0;
          }
      </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                          <td style="padding: 10px;">
                              <div class="contact-info">
                                  <p><img src="https://i.ibb.co/K04zq8b/WCall.png" alt="" style="width: 20px;"> +1 (615) 623-1368</p>
                                  <p><img src="https://i.ibb.co/TL7k4FF/Container.png" alt="" style="width: 20px;"> thecoinstarprobitminers@gmail.com</p>
                                  <p><img src="https://i.ibb.co/CbSFkwC/Wloc.png" alt="" style="width: 20px;"> 18 Eastbourne Rd, United Kingdom</p>
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <td style="padding: 20px 0;">
                              <img src="https://i.ibb.co/Gcs5Lbx/jjjjjjjjjj.jpg" alt="">
                              <h1 style="color: #ffffff; font-size: 40px; font-family: Impact, sans-serif; font-weight: 500">Coinstarpro Bitminers</h1>
                          </td>
                      </tr>
                  </table>
              </div>
      
              <div class="content">
                  <p>Dear ${user.fullName},</p>
            <p>Your investment in the ${plan.planName} plan has expired. <br> Continue investing on our platform to keep making profit.</p>
            <p>Investment Details:</p>
            <ul>
                <li>Amount Invested: $${investment.amount}</li>
                <li>Total Returns: $${investment.returns}</li>
                <li>Duration: ${plan.durationDays} days</li>
                <li>Start Date: ${investment.Date.toDateString()}</li>
                <li>End Date: ${investment.endDate.toDateString()}</li>
            </ul>
            <br>
                  <p>If you did not initiate this, immediately send our Customer Center an email at <span style="color: #4c7fff;">${process.env.USER}</span></p>
                  <p>Thank you for choosing our platform.</p>
              </div>
      
              <div class="footer">
                  <div class="footer-content">
                      <div class="https://i.ibb.co/Gcs5Lbx/jjjjjjjjjj.jpg">
                          <img src="footer-logo.png" alt="">
                      </div>
                      <div class="footer-info">
                          <p>We bring the years, global experience, and stamina to guide our clients through new and often disruptive realities.</p>
                          <p>© Copyright 2024 Coinstarpro Bitminers. All Rights Reserved.</p>
                      </div>
                  </div>
              </div>
          </div>
      </body>
      </html>
      `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Expiration email sent successfully');
    } catch (error) {
        console.error('Error sending expiration email:', error);
    }
}

// Set up a daily cron job to process all active investments
cron.schedule('0 0 * * *', async () => {
    const activeInvestments = await InvestModel.find({ 
        status: 'active',
        endDate: { $gt: new Date() }
    });
    for (const investment of activeInvestments) {
        await interestQueue.add({ investmentId: investment._id });
    }
});