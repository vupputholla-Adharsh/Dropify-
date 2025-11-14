const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://dropify-6tks.onrender.com/api" // Production API URL
    : "https://dropify-6tks.onrender.com/api"
// Define types for each model
type DeliveryPersonnel = {
  id: string
  name: string
  vehicleType: string
  currentLocation: { lat: number; lng: number }
  assignedOrders: string[] // Array of Order IDs
  status: "active" | "busy" | "offline"
}

type DeliveryStation = {
  id: string
  location: { lat: number; lng: number }
  availableItems: string[] // Array of Item IDs
  activeDeliveries: string[] // Array of Order IDs
  status: "active" | "inactive"
}

type EmergencyRequest = {
  id: string
  userId: string // User ID
  type: "medical" | "vehicle breakdown"
  status: "pending" | "in progress" | "resolved"
  assignedPersonnelId: string // DeliveryPersonnel ID
}

type Item = {
  id: string
  name: string
  description?: string
  price: number
  category: string
  stockQuantity?: number
}

type Order = {
  id: string
  userId: string // User ID
  items: string[] // Array of Item names
  deliveryStationId?: string // DeliveryStation ID
  orderStatus: "pending" | "in transit" | "delivered"
  estimatedDeliveryTime: Date
  deliveryPersonId?: string // DeliveryPersonnel ID
}

type TrafficUpdate = {
  id: string
  userId: string // User ID
  location: { lat: number; lng: number }
  description: string
  verified: boolean
  timestamp: Date
}

export type TransportRequest = {
  _id: string
  userId: string // User ID
  vehicleType: string
  dropOffLocation: { lat: number; lng: number }
  vehicleStatus: "pending" | "in transit" | "delivered"
}

export type User = {
  id: string
  name: string
  email: string
  phoneNumber: string
  greentip: number;
  currentLocation: { lat: number; lng: number }
  preferences: {
    food: string[]
    transport: string[]
    entertainment: string[]
  }
  rewardPoints: number
  carbonFootprintReduction: number
}

// Utility function for fetch
const fetchAPI = async <T>(
  url: string,
  method: string = "GET",
  body?: object
): Promise<T> => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}), // Add token if it exists
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

const routes = {
  deliveryPersonnel: {
    create: (personnel: Partial<DeliveryPersonnel>) =>
      fetchAPI<DeliveryPersonnel>(
        `${API_BASE_URL}/delivery-personnel`,
        "POST",
        personnel
      ),
    getAll: () =>
      fetchAPI<DeliveryPersonnel[]>(`${API_BASE_URL}/delivery-personnel`),
    getById: (id: string) =>
      fetchAPI<DeliveryPersonnel>(`${API_BASE_URL}/delivery-personnel/${id}`),
    update: (id: string, personnel: Partial<DeliveryPersonnel>) =>
      fetchAPI<DeliveryPersonnel>(
        `${API_BASE_URL}/delivery-personnel/${id}`,
        "PUT",
        personnel
      ),
    delete: (id: string) =>
      fetchAPI<void>(`${API_BASE_URL}/delivery-personnel/${id}`, "DELETE"),
  },
  deliveryStation: {
    create: (station: Partial<DeliveryStation>) =>
      fetchAPI<DeliveryStation>(
        `${API_BASE_URL}/delivery-station`,
        "POST",
        station
      ),
    getAll: () =>
      fetchAPI<DeliveryStation[]>(`${API_BASE_URL}/delivery-station`),
    getById: (id: string) =>
      fetchAPI<DeliveryStation>(`${API_BASE_URL}/delivery-station/${id}`),
    update: (id: string, station: Partial<DeliveryStation>) =>
      fetchAPI<DeliveryStation>(
        `${API_BASE_URL}/delivery-station/${id}`,
        "PUT",
        station
      ),
    delete: (id: string) =>
      fetchAPI<void>(`${API_BASE_URL}/delivery-station/${id}`, "DELETE"),
  },
  emergencyRequest: {
    create: (request: Partial<EmergencyRequest>) =>
      fetchAPI<EmergencyRequest>(
        `${API_BASE_URL}/emergency-request`,
        "POST",
        request
      ),
    getAll: () =>
      fetchAPI<EmergencyRequest[]>(`${API_BASE_URL}/emergency-request`),
    getById: (id: string) =>
      fetchAPI<EmergencyRequest>(`${API_BASE_URL}/emergency-request/${id}`),
    updateStatus: (id: string, status: EmergencyRequest["status"]) =>
      fetchAPI<EmergencyRequest>(
        `${API_BASE_URL}/emergency-request/${id}`,
        "PUT",
        { status }
      ),
    delete: (id: string) =>
      fetchAPI<void>(`${API_BASE_URL}/emergency-request/${id}`, "DELETE"),
  },
  users: {
    create: (user: Partial<User>) =>
      fetchAPI<User>(`${API_BASE_URL}/users`, "POST", user),
    getAll: () => fetchAPI<User[]>(`${API_BASE_URL}/users`),
    getById: (id: string) => fetchAPI<User>(`${API_BASE_URL}/users/${id}`),
    update: (id: string, user: Partial<User>) =>
      fetchAPI<User>(`${API_BASE_URL}/users/${id}`, "PUT", user),
    delete: (id: string) =>
      fetchAPI<void>(`${API_BASE_URL}/users/${id}`, "DELETE"),
  },
  orders: {
    create: (order: Partial<Order>) =>
      fetchAPI<Order>(`${API_BASE_URL}/orders`, "POST", order),
    getAll: () => fetchAPI<Order[]>(`${API_BASE_URL}/orders`),
    getById: (id: string) => fetchAPI<Order>(`${API_BASE_URL}/orders/${id}`),
    updateStatus: (id: string, status: Order["orderStatus"]) =>
      fetchAPI<Order>(`${API_BASE_URL}/orders/${id}/status`, "PUT", { status }),
    updateEstimatedDeliveryTime: (id: string, estimatedDeliveryTime: Date) =>
      fetchAPI<Order>(
        `${API_BASE_URL}/orders/${id}/estimated-delivery-time`,
        "PUT",
        {
          estimatedDeliveryTime,
        }
      ),
    delete: (id: string) =>
      fetchAPI<void>(`${API_BASE_URL}/orders/${id}`, "DELETE"),
  },
  trafficUpdates: {
    create: (update: Partial<TrafficUpdate>) =>
      fetchAPI<TrafficUpdate>(
        `${API_BASE_URL}/traffic-updates`,
        "POST",
        update
      ),
    getAll: () => fetchAPI<TrafficUpdate[]>(`${API_BASE_URL}/traffic-updates`),
    getById: (id: string) =>
      fetchAPI<TrafficUpdate>(`${API_BASE_URL}/traffic-updates/${id}`),
    updateVerification: (id: string, verified: boolean) =>
      fetchAPI<TrafficUpdate>(
        `${API_BASE_URL}/traffic-updates/${id}/verification`,
        "PUT",
        {
          verified,
        }
      ),
    delete: (id: string) =>
      fetchAPI<void>(`${API_BASE_URL}/traffic-updates/${id}`, "DELETE"),
  },
  transportRequests: {
    create: (request: Partial<TransportRequest>) =>
      fetchAPI<TransportRequest>(
        `${API_BASE_URL}/transport-requests`,
        "POST",
        request
      ),
    getAll: () =>
      fetchAPI<TransportRequest[]>(`${API_BASE_URL}/transport-requests`),
    getById: (id: string) =>
      fetchAPI<TransportRequest>(`${API_BASE_URL}/transport-requests/${id}`),
    updateStatus: (id: string, status: TransportRequest["vehicleStatus"]) =>
      fetchAPI<TransportRequest>(
        `${API_BASE_URL}/transport-requests/${id}/status`,
        "PUT",
        {
          status,
        }
      ),
    delete: (id: string) =>
      fetchAPI<void>(`${API_BASE_URL}/transport-requests/${id}`, "DELETE"),
  },
  items: {
    create: (item: Partial<Item>) =>
      fetchAPI<Item>(`${API_BASE_URL}/items`, "POST", item),
    getAll: () => fetchAPI<Item[]>(`${API_BASE_URL}/items`),
    getById: (id: string) => fetchAPI<Item>(`${API_BASE_URL}/items/${id}`),
    update: (id: string, item: Partial<Item>) =>
      fetchAPI<Item>(`${API_BASE_URL}/items/${id}`, "PUT", item),
    delete: (id: string) =>
      fetchAPI<void>(`${API_BASE_URL}/items/${id}`, "DELETE"),
  },
}

export default routes
