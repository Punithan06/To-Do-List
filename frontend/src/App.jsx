import React, { useState, useEffect } from 'react';
import api from './api';
import { Plus, Trash2, CheckCircle, Circle, Loader2 } from 'lucide-react';

function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await api.get('/todos/');
            setTodos(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (e) => {
        e.preventDefault();
        if (!title) return;
        try {
            const res = await api.post('/todos/', { title, description, completed: false });
            setTodos([...todos, res.data]);
            setTitle('');
            setDescription('');
        } catch (err) {
            console.error(err);
        }
    };

    const toggleTodo = async (todo) => {
        try {
            const res = await api.patch(`/todos/${todo.id}/`, { completed: !todo.completed });
            setTodos(todos.map((t) => (t.id === todo.id ? res.data : t)));
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await api.delete(`/todos/${id}/`);
            setTodos(todos.filter((t) => t.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>My Tasks</h1>
                <p>Stay organized and productive.</p>
            </header>

            <form onSubmit={addTodo} className="todo-form">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Add a description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit" className="add-btn">
                    <Plus size={20} />
                    <span>Add Task</span>
                </button>
            </form>

            {loading ? (
                <div className="loading">
                    <Loader2 className="animate-spin" />
                </div>
            ) : (
                <div className="todo-list">
                    {todos.length === 0 ? (
                        <div className="empty-state">
                            <p>No tasks yet. Add one above!</p>
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                                <div className="todo-content" onClick={() => toggleTodo(todo)}>
                                    {todo.completed ? (
                                        <CheckCircle className="check-icon done" size={24} />
                                    ) : (
                                        <Circle className="check-icon" size={24} />
                                    )}
                                    <div className="text">
                                        <h3>{todo.title}</h3>
                                        {todo.description && <p>{todo.description}</p>}
                                    </div>
                                </div>
                                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
