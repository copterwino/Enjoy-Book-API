import { Router } from 'express';
import {login, register } from '../controllers/authen';

const router = Router()

// Route for signing in a user
router.post('/login', login);
// Route for signing up a new user
router.post('/register', register);


export default router;