import { Router } from 'express';
import { 
    createDeliveryStation,
    getAllDeliveryStations,
    getDeliveryStationById,
    updateDeliveryStation,
    deleteDeliveryStation 
} from '../controllers/DeliveryStationController';

const router: Router = Router();

router.post('/', createDeliveryStation);              // Create a new delivery station
router.get('/', getAllDeliveryStations);              // Get all delivery stations
router.get('/:id', getDeliveryStationById);           // Get a specific delivery station by ID
router.put('/:id', updateDeliveryStation);            // Update a delivery station's details
router.delete('/:id', deleteDeliveryStation);         // Delete a delivery station

export default router;
