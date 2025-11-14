import { Router } from 'express';
import { 
    createTrafficUpdate,
    getAllTrafficUpdates,
    getTrafficUpdateById,
    updateTrafficUpdateVerification,
    deleteTrafficUpdate 
} from '../controllers/TrafficUpdateController';

const router: Router = Router();

router.post('/', createTrafficUpdate);                       // Create a new traffic update
router.get('/', getAllTrafficUpdates);                       // Get all traffic updates
router.get('/:id', getTrafficUpdateById);                    // Get a specific traffic update by ID
router.put('/:id/verification', updateTrafficUpdateVerification);  // Update traffic update verification status
router.delete('/:id', deleteTrafficUpdate);                  // Delete a traffic update

export default router;
