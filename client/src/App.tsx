import React, { useEffect } from 'react';
import './App.css';
import Input from './components/Input';
import Button from './components/Button';
import List from './components/List';
 
function App() {
  const [todos, setTodos] = React.useState<any[]>([]);
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
        console.log(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchTodos();
  }, []);

  async function markDone(id: number) {

    const response = await fetch(`${apiURL}/${id}`, {
      method: "PATCH"
    });
  
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
        <Input />
        {/* <Button onClick={addTodo} /> */}
        <Button />
      </div>

      {todos.map((todo: any) => (
        <List text={todo.title} 
        key={todo.id} 
        onClick={() => deleteItem(todo.id)}
        doneClick={() => markDone(todo.id)}
        />
      ))}


    </div>
  );
}

export default App;
