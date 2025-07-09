import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  dueDate: Date,
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Todo", TodoSchema);
