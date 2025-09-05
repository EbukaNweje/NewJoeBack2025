const router = require("express").Router()
const {CreateWallet, deleteWalletAddress, updateWalletAddress, getAllWalletAddress}  = require("../controllers/AddWallet")


router.post("/createWalletAddress", CreateWallet)
router.get("/getallWalletAddress",  getAllWalletAddress)
router.delete("/deleteWalletAddress/:id", deleteWalletAddress)
router.patch("/updateWalletAdddrss", updateWalletAddress)


module.exports = router
