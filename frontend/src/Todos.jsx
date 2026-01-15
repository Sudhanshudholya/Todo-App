import axios from "axios";
import React, { useEffect, useState } from "react";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  const API = import.meta.env.VITE_APP_BASE_URI;

  const getAllTodos = async () => {
    const response = await axios.get(`${API}/get-all-todos`);
    setTodos(response.data.todos);
  };

  //   const addTodo = async () => {
  //     if (!title.trim()) return;
  //     await axios.post(`${API}/create-todo`, { title });
  //     setTitle("");
  //     getAllTodos();
  //   };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/delete-todo-by-id/${id}`);
    getAllTodos();
  };

  //   const updateTodo = async () => {
  //     if (!editId) {
  //       alert("Please select todo to edit");
  //       return;
  //     }

  //     if (!title.trim()) {
  //       alert("Title is required");
  //       return;
  //     }

  //     await axios.put(`${API}/update-todo-by-id/${editId}`, {
  //       title,
  //     });

  //     setTitle("");
  //     setEditId(null);
  //     getAllTodos();
  //   };

  const submitTodo = async () => {
    if (!title.trim()) return;

    if (editId) {
      await axios.put(`${API}/update-todo-by-id/${editId}`, { title });
      setEditId(null);
    } else {
      await axios.post(`${API}/create-todo`, { title });
    }
    setTitle("");
    getAllTodos();
  };

  const editTodo = (todo) => {
    setTitle(todo.title);
    setEditId(todo._id);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          📝 Todo App (Table)
        </h2>

        {/* Add Todo */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={submitTodo}
            className={`px-5 py-2 rounded-lg text-white font-medium transition ${
              editId
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editId ? "Update Todo" : "Add Todo"}
          </button>
        </div>

        {/* Todo Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {todos.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No Todo Found
                  </td>
                </tr>
              ) : (
                todos.map((todo, index) => (
                  <tr key={todo._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{index + 1}</td>

                    <td
                      className={`py-3 px-4 cursor-pointer ${
                        todo.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {todo.title}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => editTodo(todo)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteTodo(todo._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Todos;
