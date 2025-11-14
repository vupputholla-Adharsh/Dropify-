import jwt from 'jsonwebtoken';

const JWT_SECRET = 'abcd';
const JWT_EXPIRATION = '7d'; // Token expiration time

// Function to generate JWT
export const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

// Function to verify JWT
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
