import { Request, Response } from 'express';
import TrafficUpdate from '../models/TrafficUpdate';

// Create a new traffic update
export const createTrafficUpdate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, location, description } = req.body;

        const newTrafficUpdate = new TrafficUpdate({
            userId,
            location,
            description,
            verified: false,  // Default verified status
            timestamp: new Date(),
        });

        await newTrafficUpdate.save();
        res.status(201).json({ message: 'Traffic update created successfully', newTrafficUpdate });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to create traffic update', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to create traffic update', details: 'Unknown error' });
        }
    }
};

// Get all traffic updates
export const getAllTrafficUpdates = async (req: Request, res: Response): Promise<void> => {
    try {
        const trafficUpdates = await TrafficUpdate.find().populate('userId');
        res.status(200).json(trafficUpdates);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch traffic updates', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch traffic updates', details: 'Unknown error' });
        }
    }
};

// Get a specific traffic update by ID
export const getTrafficUpdateById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const trafficUpdate = await TrafficUpdate.findById(id).populate('userId');

        if (!trafficUpdate) {
            res.status(404).json({ error: 'Traffic update not found' });
            return;
        }

        res.status(200).json(trafficUpdate);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch traffic update', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch traffic update', details: 'Unknown error' });
        }
    }
};

// Update the verification status of a traffic update
export const updateTrafficUpdateVerification = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { verified } = req.body;

        const updatedTrafficUpdate = await TrafficUpdate.findByIdAndUpdate(id, { verified }, { new: true });

        if (!updatedTrafficUpdate) {
            res.status(404).json({ error: 'Traffic update not found' });
            return;
        }

        res.status(200).json({ message: 'Traffic update verification status updated', updatedTrafficUpdate });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to update traffic update verification', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to update traffic update verification', details: 'Unknown error' });
        }
    }
};

// Delete a traffic update
export const deleteTrafficUpdate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deletedTrafficUpdate = await TrafficUpdate.findByIdAndDelete(id);

        if (!deletedTrafficUpdate) {
            res.status(404).json({ error: 'Traffic update not found' });
            return;
        }

        res.status(200).json({ message: 'Traffic update deleted successfully' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to delete traffic update', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to delete traffic update', details: 'Unknown error' });
        }
    }
};
