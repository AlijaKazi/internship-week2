const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { description, amount, date } = req.body;

    if (!description || !amount) {
        return res.status(400).json({ error: 'Description and amount are required.' });
    }

    const transaction = new Transaction({
        description,
        amount,
        date,
    });

    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
