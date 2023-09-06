const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send("Error fetching users");
    }
};

exports.createUser = async (req, res) => {
    const newUser = req.body;
    try {
        const user = await User.create(newUser);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).send("Error creating user");
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).send("Error fetching user");
    }
};

exports.updateUserById = async (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).send("Error updating user");
    }
};

exports.deleteUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await User.findByIdAndDelete(userId);
        if (!result) {
            res.status(404).send("User not found");
        } else {
            res.status(200).send("User deleted");
        }
    } catch (error) {
        res.status(500).send("Error deleting user");
    }
};
