import app from './app'

import sequelize from './db/sequelize';
import http from "http";
import { Server } from "socket.io"



const httpServer = http.createServer(app);
export const io = new Server(httpServer)

async function startServer() {
    // Database
    try{
        await sequelize.authenticate();
        console.log("✅ Database conected")
    }catch (error) {
        console.error("❌ Database conection failed", error)
    }
    const PORT = process.env.DB_PORT || 3000
    //Start the server
    httpServer.listen(PORT, () =>{
        console.log(`Server listening on port: ${PORT}`)
    });
}

startServer();

