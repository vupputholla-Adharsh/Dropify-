import { Router } from 'express';
import { 
    createDeliveryPersonnel,
    getAllDeliveryPersonnel,
    getDeliveryPersonnelById,
    updateDeliveryPersonnel,
    deleteDeliveryPersonnel 
} from '../controllers/DeliveryPersonnelController';

const router: Router = Router();

router.post('/', createDeliveryPersonnel);              // Create a new delivery personnel
router.get('/', getAllDeliveryPersonnel);               // Get all delivery personnel
router.get('/:id', getDeliveryPersonnelById);           // Get a specific delivery personnel by ID
router.put('/:id', updateDeliveryPersonnel);            // Update a delivery personnel's details
router.delete('/:id', deleteDeliveryPersonnel);         // Delete a delivery personnel

export default router;
