import "../styles/globals.css"
import "leaflet/dist/leaflet.css";
import "react-toastify/dist/ReactToastify.css";

import { SocketProvider } from "@/lib/socketcontext";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
       <head>
        <title>Dropify</title>
      </head>
      <body>
        <SocketProvider>{children}</SocketProvider>
        <ToastContainer />

      </body>
    </html>
  );
}
