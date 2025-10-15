import express, {Application ,Router, Request, Response} from 'express';
import authRoutes from "./routes/authRoutes"
import { logger } from './middlewares/logger';
import cors from "cors";

const app : Application = express();
// Use CORS for cross-origin requests
app.use(cors()); 
// Parse incoming requests with JSON payloads
app.use(express.json()); 

// Use authentication routes
app.use("/api", authRoutes);
app.use(logger)

app.get('/', (req: Request, res: Response)  => {
    res.send('API is up and running!');
});

export default app;