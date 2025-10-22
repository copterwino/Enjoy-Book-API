import express, {Application ,Router, Request, Response} from 'express';
import cors from "cors";

import authRoutes from "./routes/authen.route"
import book_tran from "./routes/book_tran.route"
import category from "./routes/category.route"
import book_group from "./routes/book_group.route"

//import { logger } from './middlewares/logger';


const app : Application = express();
// Use CORS for cross-origin requests
app.use(cors()); 
// Parse incoming requests with JSON payloads
app.use(express.json()); 

// Use authentication routes
app.use("/api/user", authRoutes);
app.use("/api/book", book_tran);
app.use("/api/category", category);
app.use("/api/bookGroup", book_group);

// Use logger middleware
//app.use(logger);


app.get('/', (req: Request, res: Response)  => {
    res.send('API is up and running!');
});

export default app;