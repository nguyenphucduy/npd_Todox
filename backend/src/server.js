import express from 'express';
import tasksRoutes from './routes/tasksRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5001;  // Sử dụng cổng từ biến môi trường hoặc mặc định là 5001


const app = express();// Tạo ứng dụng Express



app.use(express.json());// Middleware để phân tích cú pháp JSON

app.use("/api/tasks",tasksRoutes);// Sử dụng routes cho các nhiệm vụ

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server bất đầu trên cổng ${PORT}...');// Lắng nghe kết nối trên cổng đã chỉ định
    });
});







