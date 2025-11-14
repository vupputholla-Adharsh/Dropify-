import { Router } from 'express';
import { 
    createEmergencyRequest,
    getAllEmergencyRequests,
    getEmergencyRequestById,
    updateEmergencyRequestStatus,
    deleteEmergencyRequest 
} from '../controllers/EmergencyRequestController';

const router: Router = Router();

router.post('/', createEmergencyRequest);              // Create a new emergency request
router.get('/', getAllEmergencyRequests);              // Get all emergency requests
router.get('/:id', getEmergencyRequestById);           // Get a specific emergency request by ID
router.put('/:id', updateEmergencyRequestStatus);      // Update the status of an emergency request
router.delete('/:id', deleteEmergencyRequest);         // Delete an emergency request

export default router;
