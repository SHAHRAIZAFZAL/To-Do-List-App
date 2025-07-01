import React, { useEffect, useState } from "react";
import axios from "axios";


const Todo = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const token = localStorage.getItem("token");
  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTodos(res.data);  
  };

  const handleAdd = async () => {
    if (!text.trim()) return;
    if (!text.trim().length) { 
      alert("please enter a task:");
      return;

    }
    if (dueDate && new Date(dueDate) < new Date()) {
      alert("Due date cannot be in the past.");
      return;
    }

    const res = await axios.post("http://localhost:5000/api/todos/add", {
      text,
      dueDate,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTodos([...todos, res.data]);
    setText("");
    setDueDate("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const handleToggle = async (id, completed) => {
    const res = await axios.put(`http://localhost:5000/api/todos/${id}`, {
      completed: !completed,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = async () => {
    const res = await axios.put(`http://localhost:5000/api/todos/${editingId}`, {
      text: editingText,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTodos(todos.map((todo) => (todo._id === editingId ? res.data : todo)));
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };


  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-green-950 flex items-center">
      <div className="max-w-lg mx-auto mt-10 p-6 bg-green-700 rounded-lg shadow-lg text-white">
        <h1 className="text-2xl font-bold mb-4"> Sherry’s To-Do List</h1>

        {/* Input for task and due date */}
        <div className="flex mb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a task"
            className="flex-1 border px-4 py-2 rounded-l text-black"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border px-4 py-2 ml-2 text-black"
          />
          <button
            onClick={handleAdd}
            className="bg-purple-600 text-white px-4 py-2 rounded-r hover:bg-purple-700"
          >
            Add
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-4">
          {["all", "completed", "incomplete"].map((f) => (
            <button
              key={f}
              className={`px-3 py-1 rounded ${filter === f ? "bg-purple-600 text-white" : "bg-gray-700 text-white"
                }`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Task List */}
        <ul>
          {filteredTodos.map((todo) => (
            <li
              key={todo._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-600"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo._id, todo.completed)}
                />

                {editingId === todo._id ? (
                  <>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="border px-2 py-1 rounded mr-2 text-black"
                    />
                    <button onClick={saveEdit} className="text-green-400 font-bold mr-2">
                      Save
                    </button>
                    <button onClick={cancelEdit} className="text-gray-300 font-bold">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span className={todo.completed ? "line-through text-gray-400" : ""}>
                      {todo.text}
                    </span>
                    <button
                      onClick={() => startEditing(todo._id, todo.text)}
                      className="text-purple-400 font-bold ml-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="text-red-400 font-bold ml-2"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>

              {todo.dueDate && (
                <span className="text-sm text-gray-400 mt-2 sm:mt-0">
                  (Due: {new Date(todo.dueDate).toLocaleDateString()})
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
