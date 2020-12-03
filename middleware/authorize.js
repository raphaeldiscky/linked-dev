// middleware = "penengah" => fungsi yang harus dilewati terlebih dahulu sebelum masuk/keluar dalam sistem
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if there's no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' }); // Unauthorized
  }

  // Verify / decode token then assign to req.user
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // we can use req.user in any routes that protected
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
