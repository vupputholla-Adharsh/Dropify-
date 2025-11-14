import { Request, Response } from 'express';
import TransportRequest from '../models/TransportRequest';
import User from '../models/User';

// Create a new transport request
export const createTransportRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const activeRental = await TransportRequest.findOne({ userId: req.body.decoded.userId, vehicleStatus: 'pending' });
        if (activeRental) {
            res.status(400).json({ error: 'You already have an active rental' });
            return;
            
        }
        const {  vehicleType, dropOffLocation } = req.body;
        const userId = req.body.decoded.userId;
        const newTransportRequest = new TransportRequest({
            userId,
            vehicleType,
            dropOffLocation,
            vehicleStatus: 'pending',  // Default status
            
        });
         await User.findByIdAndUpdate(userId, { $inc: { greentip: 1 } }, { new: true });
        await newTransportRequest.save();
        res.status(201).json({ message: 'Transport request created successfully', newTransportRequest });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to create transport request', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to create transport request', details: 'Unknown error' });
        }
    }
};

// Get all transport requests
export const getAllTransportRequests = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.body.decoded.userId;

        const transportRequests = await TransportRequest.find({ userId: id})
        res.status(200).json(transportRequests);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch transport requests', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch transport requests', details: 'Unknown error' });
        }
    }
};

// Get a specific transport request by ID
export const getTransportRequestById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const transportRequest = await TransportRequest.findById(id).populate('userId');

        if (!transportRequest) {
            res.status(404).json({ error: 'Transport request not found' });
            return;
        }

        res.status(200).json(transportRequest);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch transport request', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch transport request', details: 'Unknown error' });
        }
    }
};

// Update the status of a transport request
export const updateTransportRequestStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { vehicleStatus } = req.body;

        const updatedTransportRequest = await TransportRequest.findByIdAndUpdate(id, { vehicleStatus }, { new: true });

        if (!updatedTransportRequest) {
            res.status(404).json({ error: 'Transport request not found' });
            return;
        }

        res.status(200).json({ message: 'Transport request status updated', updatedTransportRequest });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to update transport request status', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to update transport request status', details: 'Unknown error' });
        }
    }
};

// Delete a transport request
export const deleteTransportRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deletedTransportRequest = await TransportRequest.findByIdAndDelete(id);

        if (!deletedTransportRequest) {
            res.status(404).json({ error: 'Transport request not found' });
            return;
        }

        res.status(200).json({ message: 'Transport request deleted successfully' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to delete transport request', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to delete transport request', details: 'Unknown error' });
        }
    }
};
