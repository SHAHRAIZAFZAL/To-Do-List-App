const express = require('express');
const router = express.Router();
const User = require('./models/user.model');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "sherrySecretKey"; 


router.post('/register', userSignup);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
