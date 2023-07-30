import './App.css';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';

function App() {
  const [ todos, setTodos ] = useState([]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null;
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  };


  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type='text' ref={todoNameRef} />
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={deleteTodo} >完了したタスクの削除</button>
      <div>
        残りのタスク:
        {todos.filter(todo => !todo.complete).length}
      </div>
    </>
  );
}

export default App;
