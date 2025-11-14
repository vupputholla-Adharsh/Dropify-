import { Router } from 'express';
import { 
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    updateEstimatedDeliveryTime,
    deleteOrder 
} from '../controllers/OrderController';
import { authenticate } from '../middleware/auth';

const router: Router = Router();
router.post('/', createOrder);                       // Create a new order
router.get('/',authenticate(),getAllOrders);                       // Get all orders
router.get('/:id', getOrderById);                    // Get a specific order by ID
router.put('/:id/status', updateOrderStatus);       // Update order status
router.put('/:id/estimated-delivery-time', updateEstimatedDeliveryTime); // Update estimated delivery time
router.delete('/:id', deleteOrder);                  // Delete an order

export default router;
