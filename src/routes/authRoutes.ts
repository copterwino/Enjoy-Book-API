import { Router } from 'express';
import { getUsers } from '../controllers/userController';

const router = Router()

// Route for signing in a user
router.post('/login', login);
// Route for signing up a new user
router.post.apply('/register', register);

// Route to get all users (requires admin permission)
//router.get("/user", requireSignin, checkAdmin, getAllUser);
// Route to get user by ID (requires sign-in)
//router.get("/user:_id", requireSignin, getUserByID);

//router.get('/users', getUsers);

export default router;