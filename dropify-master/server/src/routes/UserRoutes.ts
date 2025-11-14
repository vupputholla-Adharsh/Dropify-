import { Router } from 'express';
import { 
    createUser,
    getAllUsers,
    getUserById,
    updateUserPreferences,
    updateUserLocation,
    updateUserRewardPoints,
    deleteUser 
} from '../controllers/UserController';

const router: Router = Router();

router.post('/', createUser);                       // Create a new user
router.get('/', getAllUsers);                       // Get all users
router.get('/:id', getUserById);                    // Get a specific user by ID
router.put('/:id/preferences', updateUserPreferences);   // Update user preferences
router.put('/:id/location', updateUserLocation);          // Update user location
router.put('/:id/reward-points', updateUserRewardPoints); // Update user reward points
router.delete('/:id', deleteUser);                  // Delete a user

export default router;
