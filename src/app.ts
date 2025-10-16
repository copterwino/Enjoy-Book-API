import express, {Application ,Router, Request, Response} from 'express';
import cors from "cors";

import authRoutes from "./routes/authen"
import book from "./routes/book"

import { logger } from './middlewares/logger';


const app : Application = express();
// Use CORS for cross-origin requests
app.use(cors()); 
// Parse incoming requests with JSON payloads
app.use(express.json()); 

// Use authentication routes
app.use("/api/user", authRoutes);
app.use("/api/book",book);
app.use(logger);


app.get('/', (req: Request, res: Response)  => {
    res.send('API is up and running!');
});

export default app;