const express = require('express');
const User = require('../models/User'); 
const router = express.Router();

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields (username, email, password) are required.' });
    }

    try {
        const user = new User({ username, email, password });
        await user.save(); 
        res.status(201).json(user); 
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users); 
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const user = await User.findById(id); 
        if (!user) {
            return res.status(404).json({ error: 'User not found' }); 
        }
        res.status(200).json(user); 
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields (username, email, password) are required.' });
    }

    try {
        const user = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user); 
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const user = await User.findByIdAndDelete(id); 
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' }); 
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
});

module.exports = router; 
