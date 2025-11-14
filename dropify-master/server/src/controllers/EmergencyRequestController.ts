import { Request, Response } from 'express';
import EmergencyRequest from '../models/EmergencyRequest';

// Create a new emergency request
export const createEmergencyRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, type, assignedPersonnelId } = req.body;

        const newEmergencyRequest = new EmergencyRequest({
            userId,
            type,
            assignedPersonnelId,
            status: 'pending', // Default status
        });

        await newEmergencyRequest.save();
        res.status(201).json({ message: 'Emergency request created successfully', newEmergencyRequest });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to create emergency request', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to create emergency request', details: 'Unknown error' });
        }
    }
};

// Get all emergency requests
export const getAllEmergencyRequests = async (req: Request, res: Response): Promise<void> => {
    try {
        const emergencyRequests = await EmergencyRequest.find().populate('userId assignedPersonnelId');
        res.status(200).json(emergencyRequests);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch emergency requests', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch emergency requests', details: 'Unknown error' });
        }
    }
};

// Get a specific emergency request by ID
export const getEmergencyRequestById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const emergencyRequest = await EmergencyRequest.findById(id).populate('userId assignedPersonnelId');

        if (!emergencyRequest) {
            res.status(404).json({ error: 'Emergency request not found' });
            return;
        }

        res.status(200).json(emergencyRequest);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch emergency request', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch emergency request', details: 'Unknown error' });
        }
    }
};

// Update the status of an emergency request
export const updateEmergencyRequestStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'in progress', 'resolved'].includes(status)) {
            res.status(400).json({ error: 'Invalid status value' });
            return;
        }

        const emergencyRequest = await EmergencyRequest.findByIdAndUpdate(id, { status }, { new: true });

        if (!emergencyRequest) {
            res.status(404).json({ error: 'Emergency request not found' });
            return;
        }

        res.status(200).json({ message: 'Emergency request status updated successfully', emergencyRequest });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to update emergency request status', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to update emergency request status', details: 'Unknown error' });
        }
    }
};

// Delete an emergency request
export const deleteEmergencyRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const emergencyRequest = await EmergencyRequest.findByIdAndDelete(id);

        if (!emergencyRequest) {
            res.status(404).json({ error: 'Emergency request not found' });
            return;
        }

        res.status(200).json({ message: 'Emergency request deleted successfully' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to delete emergency request', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to delete emergency request', details: 'Unknown error' });
        }
    }
};
