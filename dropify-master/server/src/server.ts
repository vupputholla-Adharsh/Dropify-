import dotenv from 'dotenv';
import http from 'http';
import app from './app';
import socketSetup from './sockets';

dotenv.config();

// Create HTTP server
const server = http.createServer(app);

// Socket.IO Setup
socketSetup(server);

// Start the server
const PORT = process.env.PORT || 5050;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
