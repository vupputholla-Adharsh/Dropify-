import { Request, Response } from 'express';
import DeliveryPersonnel from '../models/DeliveryPersonnel';

// Create a new delivery personnel
export const createDeliveryPersonnel = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, vehicleType, currentLocation, assignedOrders } = req.body;
        
        const newDeliveryPersonnel = new DeliveryPersonnel({
            name,
            vehicleType,
            currentLocation,
            assignedOrders,
        });

        await newDeliveryPersonnel.save();
        res.status(201).json({ message: 'Delivery personnel created successfully', newDeliveryPersonnel });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to create delivery personnel', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to create delivery personnel', details: 'Unknown error' });
        }
    }
};

// Get all delivery personnel
export const getAllDeliveryPersonnel = async (req: Request, res: Response): Promise<void> => {
    try {
        const deliveryPersonnelList = await DeliveryPersonnel.find().populate('assignedOrders');
        res.status(200).json(deliveryPersonnelList);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch delivery personnel', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch delivery personnel', details: 'Unknown error' });
        }
    }
};

// Get a specific delivery personnel by ID
export const getDeliveryPersonnelById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deliveryPersonnel = await DeliveryPersonnel.findById(id).populate('assignedOrders');
        
        if (!deliveryPersonnel) {
            res.status(404).json({ error: 'Delivery personnel not found' });
            return;
        }

        res.status(200).json(deliveryPersonnel);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch delivery personnel', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch delivery personnel', details: 'Unknown error' });
        }
    }
};

// Update delivery personnel's details
export const updateDeliveryPersonnel = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const deliveryPersonnel = await DeliveryPersonnel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!deliveryPersonnel) {
            res.status(404).json({ error: 'Delivery personnel not found' });
            return;
        }

        res.status(200).json({ message: 'Delivery personnel updated successfully', deliveryPersonnel });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to update delivery personnel', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to update delivery personnel', details: 'Unknown error' });
        }
    }
};

// Delete a delivery personnel
export const deleteDeliveryPersonnel = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deliveryPersonnel = await DeliveryPersonnel.findByIdAndDelete(id);

        if (!deliveryPersonnel) {
            res.status(404).json({ error: 'Delivery personnel not found' });
            return;
        }

        res.status(200).json({ message: 'Delivery personnel deleted successfully' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to delete delivery personnel', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to delete delivery personnel', details: 'Unknown error' });
        }
    }
};
