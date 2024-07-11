const jwt: any = require('jsonwebtoken');
const SECRET_KEY: any = process.env.SECRET_KEY;

const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
  });
};

const generateToken = (id: any) => {
  return jwt.sign({ id: id }, SECRET_KEY, { expiresIn: '1h' });
}

export { verifyToken, generateToken }
