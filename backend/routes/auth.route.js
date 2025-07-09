const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
import { userSignup, userLogin } from '../controllers/auth.controller.js';


const JWT_SECRET = "sherrySecretKey"; 


router.post('/register', userSignup);

router.post('/login', userLogin);

module.exports = router;
