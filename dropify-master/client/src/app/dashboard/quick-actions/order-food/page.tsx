"use client";
import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

// Define types for items and order
interface MenuItem {
  name: string;
  description: string;
  price: number;
}

interface OrderItem {
  name: string;
  price: number;
}

export default function OrderFoodPage() {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch the userId from localStorage or another method based on your auth system
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId"); // Or replace with your method of fetching the userId
    if (storedUserId) {
      setUserId(storedUserId); // Update userId state if found
    }
  }, []);

  const items: MenuItem[] = [
    {
      name: "Cheeseburger",
      description: "A delicious cheeseburger with fresh lettuce, tomato, and cheese.",
      price: 8.99,
    },
    {
      name: "Caesar Salad",
      description: "Crisp romaine lettuce, Parmesan cheese, and Caesar dressing.",
      price: 7.49,
    },
    {
      name: "Sushi Platter",
      description: "A variety of fresh sushi rolls served with soy sauce and wasabi.",
      price: 19.99,
    },
    {
      name: "Margherita Pizza",
      description: "Classic pizza with fresh basil, mozzarella, and tomato sauce.",
      price: 12.49,
    },
  ];

  const addToCart = (item: MenuItem): void => {
    setCart((prev) => [...prev, { name: item.name, price: item.price }]);
  };

  const removeFromCart = (index: number): void => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOrder = async (): Promise<void> => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!userId) {
      alert("User is not logged in.");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        userId: userId,
        items: cart.map((item) => item.name),
      };

      const response = await fetch("https://dropify-6tks.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Order placed successfully! Order ID: ${data.newOrder._id}`);
        setCart([]);
      } else {
        alert(`Error placing order: ${data.error || "Please try again later."}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h2 className="text-2xl font-bold mb-4">Order Food</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.name}
              className="bg-zinc-800/50 rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-xl">{item.name}</h3>
                <p className="text-zinc-400 mt-2">{item.description}</p>
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold text-zinc-200">
                  ${item.price.toFixed(2)}
                </p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center space-x-2"
                >
                  <PlusCircle size={16} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-zinc-800 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Cart</h3>
          {cart.length === 0 ? (
            <p className="text-zinc-400">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-zinc-700 p-3 rounded-lg"
                >
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center space-x-4">
                    <span>${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleOrder}
            className={`mt-4 px-4 py-2 ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-500"
            } text-white rounded-lg hover:bg-green-600`}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Order Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
