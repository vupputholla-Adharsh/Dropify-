import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';  // Import Express types
import User, { IUser } from '../models/User';
import DeliveryPersonnel, { IDeliveryPersonnel } from '../models/DeliveryPersonnel';

interface RegisterRequest extends Request {
  body: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: 'user' | 'delivery';
    currentLocation: { lat: number; lng: number };
    preferences?: {
      food: string[];
      transport: string[];
      entertainment: string[];
    };
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
    role: 'user' | 'delivery';
  };
}

export const registerUser = async (req: RegisterRequest, res: Response): Promise<void> => {
  const { name, email, password, role, } = req.body;

  try {
    let existingUser: IUser | IDeliveryPersonnel | null;
    if (role === 'user') {
      existingUser = await User.findOne({ email });
      if (existingUser) {
         res.status(400).json({ message: 'User already exists' });
         return
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword,  });
      await newUser.save();
       res.status(201).json({ message: 'User registered successfully' });
       return
    }

    if (role === 'delivery') {
      existingUser = await DeliveryPersonnel.findOne({ email });
      if (existingUser) {
         res.status(400).json({ message: 'Delivery personnel already exists' });
         return
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newDeliveryPersonnel = new DeliveryPersonnel({ name, email,  password: hashedPassword, status: 'active' });
      await newDeliveryPersonnel.save();
      res.status(201).json({ message: 'Delivery personnel registered successfully' });
      return
    }

     res.status(400).json({ message: 'Invalid role specified' });
     return
  } catch (error) {
    console.log(error); // Log the error for debugging
     res.status(500).json({ message: 'Server error' });
     return
  }
};

export const loginUser = async (req: LoginRequest, res: Response): Promise<void> => {
    const { email, password, role } = req.body;
  
    try {
      let user: IUser | IDeliveryPersonnel | null = null;
      if (role === 'user') {
        user = await User.findOne({ email });
      } else if (role === 'delivery') {
        user = await DeliveryPersonnel.findOne({ email });
      }
  
      if (!user) {
         res.status(400).json({ message: 'Invalid credentials' });
         return;
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         res.status(400).json({ message: 'Invalid credentials' });
         return;
      }
  
      const token = jwt.sign(
        { userId: user._id, role: role }, // Include role in token payload
        "abcd", 
        { expiresIn: process.env.JWT_EXPIRY || '1h' } // Use environment variable for token expiry
      );
      
      res.status(200).json({ token , id: user._id});
    } catch (error) {
      console.log(error); // Log the error for debugging
      res.status(500).json({ message: 'Server error' });
    }
  };
  