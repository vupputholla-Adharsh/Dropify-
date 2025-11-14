import User from '../models/User'; // Assuming the User model is in the 'models' directory
import { Socket } from 'socket.io';
import DeliveryPersonnel from '../models/DeliveryPersonnel'; 

export const handleLocationUpdate = async (socket: Socket, data: { userId: string, latitude: number, longitude: number }) => {
    try {
        const { userId, latitude, longitude } = data;

        // Find the user by userId and update their current location
        const user = await User.findById(userId);
        
        if (user) {
            user.currentLocation = { lat: latitude, lng: longitude };
            await user.save(); // Save the updated location in the database
            console.log(`User's location updated: ${latitude}, ${longitude}`);

            // Optionally, you can emit a confirmation or updated data back to the client
            socket.emit('locationUpdated', { success: true, message: 'Location updated successfully' });
        } else {
            console.log('User not found');
            socket.emit('locationUpdated', { success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating location:', error);
        socket.emit('locationUpdated', { success: false, message: 'Error updating location' });
    }
};



export const handleDeliveryPersonnelLocationUpdate = async (socket: Socket, data: { deliveryPersonnelId: string, latitude: number, longitude: number }) => {
    try {
        const { deliveryPersonnelId, latitude, longitude } = data;

        // Find the delivery personnel by their ID and update their current location
        const deliveryPersonnel = await DeliveryPersonnel.findById(deliveryPersonnelId);
        
        if (deliveryPersonnel) {
            deliveryPersonnel.currentLocation = { lat: latitude, lng: longitude };
            await deliveryPersonnel.save(); // Save the updated location in the database
            console.log(`Delivery personnel's location updated: ${latitude}, ${longitude}`);

            // Optionally, emit a confirmation or updated data back to the client
            socket.emit('deliveryPersonnelLocationUpdated', { success: true, message: 'Location updated successfully' });
        } else {
            console.log('Delivery personnel not found');
            socket.emit('deliveryPersonnelLocationUpdated', { success: false, message: 'Delivery personnel not found' });
        }
    } catch (error) {
        console.error('Error updating delivery personnel location:', error);
        socket.emit('deliveryPersonnelLocationUpdated', { success: false, message: 'Error updating location' });
    }
};
