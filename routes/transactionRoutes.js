const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionCtrl");

//router object
const router = express.Router();

//routes
//Add transaction || POST Method
router.post("/add-transaction", addTransaction);
//Edit transaction || POST Method
router.post("/edit-transaction", editTransaction);
//Delete transaction || POST Method
router.post("/delete-transaction", deleteTransaction);
//Get transactions
router.post("/get-transactions", getAllTransaction);

module.exports = router;
