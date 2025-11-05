import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {//tiêu đề công việc
            type: String,//kiểu dữ liệu chuỗi
            required: true,//bắt buộc phải có
            trim: true,//loại bỏ khoảng trắng thừa
        },
        status: {//trạng thái công việc
            type: String,
            enum: ["active", 'completed'],//chỉ được phép là 1 trong 2 giá trị này
            default: "active",//mặc định là active
        },
        completedAt: {//thời gian hoàn thành
            type: Date,//kiểu dữ liệu ngày tháng
            default: null,//mặc định là null
     },
    },
    { 
        timestamps: true,//tự động tạo createdAt và updatedAt
    }

);

const Task = mongoose.model("Task", taskSchema);//xuất mô hình Task để sử dụng ở nơi khác
export default Task;