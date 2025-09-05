const express = require("express")
const register = require("../controllers/auth")
const { check } = require('express-validator');
const admin = require("../controllers/Admin");

const Routers = express.Router()

Routers.route("/register").post([
    check('email', 'Please include a valid email').isEmail(),
  ],register.register)
Routers.route("/login").post(register.login)
Routers.route("/adminregister").post(admin.register)
Routers.route("/adminlogin").post(admin.login)
Routers.route("/reset-password/:id/:token").post(register.restLink).get(register.getrestlink)
Routers.route("/loginemailsand").post(register.loginEmailSand)
Routers.route("/signupemailsand").post(register.signupEmailSand)
Routers.route("/depositemailsend/:id").post(register.depositEmailSend)
Routers.route("/investemailsend/:id").post(register.InvestEmailSend)
Routers.route("/withdrawalemailsend/:id").post(register.withdrawalEmailSend)
Routers.route("/approvedepositemailsend/:id").post(register.ApproveDepositEmailSend)
Routers.route("/confirmwithdrawalemailsend/:withdrawId").post(register.ConfirmWithdrawalEmailSend)
Routers.route("/adminAproveEmailSand").post(register.AdminAproveEmailSand)
Routers.route("/registrationSuccessfulEmail").post(register.registrationSuccessfulEmail)
Routers.route("/resetotp/:id").post(register.resendotp)
Routers.route("/forgotpassword").post(register.forgotPassword)
Routers.route("/tradingsession/:id").get(register.tradingSession)
Routers.route("/sendpayment/:id").post(register.sendPaymentInfo)
Routers.route("/UserVerify/:id").patch(register.userverifySuccessful)

module.exports = Routers