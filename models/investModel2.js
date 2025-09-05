// const mongoose = require('mongoose');
// const {DateTime} = require('luxon')


// const createdOn = DateTime.now().toLocaleString({weekday:"short",month:"short",day:"2-digit", year:"numeric", hour:"2-digit",minute:"2-digit"})

// const InvestSchema = new mongoose.Schema({
//     plan: {
//         type: mongoose.SchemaTypes.ObjectId,
//         ref: 'InvestmentPlan',
//     },
//     transactionType:{
//         type:String,
//         default:"Invest"
//     },
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User"
//     },
//     amount: {
//         type: Number,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ["active", "completed"]
//     },
//     returns: {
//         type: Number,
//         required: true
//     },
//     Date:{
//         type:String,
//         default:createdOn
//     },
//     endDate:{
//         type:String
//     },
// }, { timestamps: true });

// const investModel = mongoose.model('Invest', InvestSchema);

// module.exports = investModel




const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const InvestSchema = new mongoose.Schema({
    plan: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'InvestmentPlan',
        required: true
    },
    transactionType: {
        type: String,
        default: "Profit"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "completed"],
        default: "active"
    },
    returns: {
        type: Number,
        default: 0
    },
    Date: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    lastInterestCalculationDate: {
        type: Date,
        default: Date.now
    },
    totalInterestEarned: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Virtual for formatted dates
InvestSchema.virtual('formattedDate').get(function() {
    return DateTime.fromJSDate(this.Date).toLocaleString({
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
});

InvestSchema.virtual('formattedEndDate').get(function() {
    return DateTime.fromJSDate(this.endDate).toLocaleString({
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
});

const InvestModel = mongoose.model('Investment', InvestSchema);

module.exports = InvestModel;