import { Request, Response } from 'express';
import DeliveryStation from '../models/DeliveryStation';
import Item from '../models/Item';
import mongoose from 'mongoose';

// Create a new delivery station
export const createDeliveryStation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { location, availableItems, activeDeliveries } = req.body;

        const newDeliveryStation = new DeliveryStation({
            location,
            availableItems,
            activeDeliveries,
        });

        await newDeliveryStation.save();
        res.status(201).json({ message: 'Delivery station created successfully', newDeliveryStation });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to create delivery station', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to create delivery station', details: 'Unknown error' });
        }
    }
};

// Get all delivery stations
export const getAllDeliveryStations = async (req: Request, res: Response): Promise<void> => {
    try {
        const deliveryStations = await DeliveryStation.find().populate('activeDeliveries');
        res.status(200).json(deliveryStations);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch delivery stations', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch delivery stations', details: 'Unknown error' });
        }
    }
};

// Get a specific delivery station by ID
export const getDeliveryStationById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deliveryStation = await DeliveryStation.findById(id).populate('activeDeliveries');

        if (!deliveryStation) {
            res.status(404).json({ error: 'Delivery station not found' });
            return;
        }

        res.status(200).json(deliveryStation);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch delivery station', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch delivery station', details: 'Unknown error' });
        }
    }
};

// Update delivery station's details
export const updateDeliveryStation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const deliveryStation = await DeliveryStation.findByIdAndUpdate(id, updatedData, { new: true });

        if (!deliveryStation) {
            res.status(404).json({ error: 'Delivery station not found' });
            return;
        }

        res.status(200).json({ message: 'Delivery station updated successfully', deliveryStation });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to update delivery station', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to update delivery station', details: 'Unknown error' });
        }
    }
};

// Delete a delivery station
export const deleteDeliveryStation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deliveryStation = await DeliveryStation.findByIdAndDelete(id);

        if (!deliveryStation) {
            res.status(404).json({ error: 'Delivery station not found' });
            return;
        }

        res.status(200).json({ message: 'Delivery station deleted successfully' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to delete delivery station', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to delete delivery station', details: 'Unknown error' });
        }
    }
};

export const addItemToStore = async (req: Request, res: Response): Promise<void> => {
    try {
        const { deliveryStationId, item } = req.body;  // Accept the full item object

        // Find the delivery station by ID
        const deliveryStation = await DeliveryStation.findById(deliveryStationId);
        if (!deliveryStation) {
            res.status(404).json({ error: 'Delivery station not found' });
            return;
        }

        // Create a new item with the provided details
        const newItem = new Item(item);
        await newItem.save();  // Save the new item to the database

        // Add the new item to the availableItems array in the delivery station
        if (!deliveryStation.availableItems.includes(newItem._id as mongoose.Types.ObjectId)) {
            deliveryStation.availableItems.push(newItem._id as mongoose.Types.ObjectId);
            await deliveryStation.save();  // Save the updated delivery station
            res.status(200).json({ message: 'Item added to delivery station successfully', newItem, deliveryStation });
        } else {
            res.status(400).json({ error: 'Item already exists in the delivery station' });
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: 'Failed to add item to delivery station', details: err.message });
        } else {
            res.status(500).json({ error: 'Failed to add item to delivery station', details: 'Unknown error' });
        }
    }
};