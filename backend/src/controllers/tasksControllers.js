import Task from "../models/Task.js";


export const getAllTasks = async (req, res) => {
    try {
        //tìm tất cả các nhiệm vụ trong cơ sở dữ liệu
        const tasks = await Task.find().sort({ createdAt: -1 });//sắp xếp nhiệm vụ theo thời gian tạo giảm dần
        res. status(200).json(tasks);//trả về danh sách nhiệm vụ với mã trạng thái 200
    } catch (error) {
        console.error("Lỗi khi gọi getAllTasks:", error);//ghi log lỗi ra console
        res.status(500).json({ message: "Lỗi hệ thống" });//trả về lỗi máy chủ với mã trạng thái 500

        
    }
};

export const createTask = async(req, res) => {
   try {
    const { title } = req.body;//lấy tiêu đề từ yêu cầu
    const task = new Task({ title });//tạo một nhiệm vụ mới với tiêu đề đã cho

    const newTask = await task.save();//lưu nhiệm vụ mới vào cơ sở dữ liệu
    res.status(201).json(newTask);//trả về nhiệm vụ mới với mã trạng thái 201

   } catch (error) {
    console.error("Lỗi khi gọi createTask:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
   }
};

export const updateTask = async (req, res) => {
   try {
    //lấy tiêu đề, trạng thái và hoàn thành từ yêu cầu
        const{title, status, completedAt} = req.body;
        //tìm và cập nhật nhiệm vụ theo ID
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title,   
              status,
              completedAt
         },

            { new: true }
        );
        //nếu không tìm thấy nhiệm vụ, trả về lỗi 404
        if (!updatedTask) {
            return res.status(404).json({ message: "Nhiệm vụ không tồn tại" })
        }
        //trả về nhiệm vụ đã cập nhật với mã trạng thái 200
        res.status(200).json(updatedTask);

   } catch (error) {
    console.error("Lỗi khi gọi updateTask:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
   }
};

export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);//tìm và xóa nhiệm vụ theo ID

        if (!deletedTask) {
            return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });//nếu không tìm thấy nhiệm vụ, trả về lỗi 404
        }
        res.status(200).json(deleteTask);
    } catch (error) {
        
        console.error("Lỗi khi gọi deleteTask:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
    
};