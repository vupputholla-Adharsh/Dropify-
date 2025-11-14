import { Request, Response } from 'express';
import User from '../models/User';

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phoneNumber, currentLocation, preferences } = req.body;

        const newUser = new User({
            name,
            email,
            phoneNumber,
            currentLocation,
            preferences,
            rewardPoints: 0,  // Default reward points
            carbonFootprintReduction: 0,  // Default carbon footprint reduction
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', newUser });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to create user', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to create user', details: 'Unknown error' });
        }
    }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().sort({ carbonFootprintReduction: -1 }).limit(5);
        res.status(200).json(users);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch users', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch users', details: 'Unknown error' });
        }
    }
};

// Get a specific user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch user', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch user', details: 'Unknown error' });
        }
    }
};

// Update a user's preferences
export const updateUserPreferences = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { preferences } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { preferences }, { new: true });

        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json({ message: 'User preferences updated successfully', updatedUser });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to update user preferences', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to update user preferences', details: 'Unknown error' });
        }
    }
};

// Update a user's location
export const updateUserLocation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { currentLocation } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { currentLocation }, { new: true });

        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json({ message: 'User location updated successfully', updatedUser });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to update user location', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to update user location', details: 'Unknown error' });
        }
    }
};

// Update a user's reward points
export const updateUserRewardPoints = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { rewardPoints } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { rewardPoints }, { new: true });

        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json({ message: 'User reward points updated successfully', updatedUser });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to update user reward points', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to update user reward points', details: 'Unknown error' });
        }
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to delete user', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to delete user', details: 'Unknown error' });
        }
    }
};
