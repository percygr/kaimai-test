import React, { useEffect, useState } from 'react';
import './App.css';
import Input from './components/Input';
import List from './components/List';
 
function App() {
  const [todos, setTodos] = useState<any[]>([]);
  const [inputTitle, setInputTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const apiURL = "http://localhost:3000/tasks";
 
  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTodos(data);
        setError(null); // Clear the error state if successful
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Network error. Is the server running on port 3000?"); // Set the error state to display to user
      }
    }
    fetchTodos();
  }, []);

  async function markDone(id: number) {
    const response = await fetch(`${apiURL}/${id}/done`, {
      method: "PUT"
    });
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  async function addTodo() {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: inputTitle })
    });
    const data = await response.json();
    setTodos([...todos, data]);
  }


  async function deleteItem(id: number) {
    try {
      await fetch(`${apiURL}/${id}`, {
        method: "DELETE"
      });

      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Delete error:", error);
    }
  }

  return (
    <div className="App">
      <h1>To Do List</h1>
      <div>
        <Input 
          addTodo={addTodo}
          inputTitle={inputTitle}
          setInputTitle={setInputTitle}
        />
      </div>

      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        todos.map((todo: any) => (
          <List 
            text={todo.title} 
            key={todo.id} 
            onClick={() => deleteItem(todo.id)}
            doneClick={() => markDone(todo.id)}
            isDone={todo.done}
          />
        ))
      )}


    </div>
  );
}

export default App;
