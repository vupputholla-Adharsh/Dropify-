// context/SocketContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Socket } from "socket.io-client";
import { initializeSocket } from "@/lib/socket/socket"; // Adjust the path if needed

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = initializeSocket();
    console.log("Socket initialized:", socketInstance); // Debug log

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect(); // Clean up socket connection on unmount
      console.log("Socket disconnected");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context.socket; // Return the socket instance
};
