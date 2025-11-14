import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import User from '../models/User';

const socketSetup = (server: HttpServer): void => {
    const io = new Server(server, {
        cors: { origin: '*' },
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('location-update', async (data) => {
            const { userId, latitude, longitude } = data;
            
            try {
                // Update the user's current location in the database
                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    { currentLocation: { lat:latitude, lng:longitude } },
                    { new: true } // Return the updated document
                );

                if (updatedUser) {
                    console.log(`Updated location for user ${userId}:`, updatedUser.currentLocation);
                    io.emit('location-update', {
                        userId,
                        currentLocation: updatedUser.currentLocation,
                    }); // Broadcast the updated location to all clients
                } else {
                    console.log(`User with ID ${userId} not found.`);
                }
            } catch (error) {
                console.error('Error updating user location:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};

export default socketSetup;
