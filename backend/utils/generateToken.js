import jwt from 'jsonwebtoken';

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, 'secretKey', { expiresIn: '1h' });
};

export default generateToken;
