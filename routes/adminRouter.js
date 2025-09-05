const router = require("express").Router()
const { confirmDeposit, confirmWithdraw, addProfit } = require("../controllers/Admin")
const {AdminSendEmail} = require("../controllers/Contacts")


router.post('/confirm-deposit/:depositId', confirmDeposit)
router.post('/confirm-withdrawal/:withdrawId', confirmWithdraw)
router.post('/add-profit/:id', addProfit)
router.post('/adminsendemail/:id', AdminSendEmail)

module.exports = router
