import { Router } from 'express';
import {login, register } from '../controllers/authen.controller';
import { refresh } from '../controllers/authen.controller';

const router = Router()

// Route for signing in a user
router.post('/login', login);
// Route for signing up a new user
router.post('/register', register);
// Route to exchange a refresh token for a new access token
router.post('/refresh', refresh);


export default router;