import {useState} from 'react';

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    setTodos(prev => {
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: newTodo,
          checked: false
        }
      ];
    });
    setNewTodo('');
    // pre-select after reload:
    window.onload = document.getElementById('newTodo').select();
  };

  const toggleTodo = (id, checked) => {
    setTodos(prev => {
      return prev.map(todo => {
        return todo.id === id ? {...todo, checked} : todo;
      });
    });
  };

  const deleteTodo = id => {
    setTodos(prev => {
      return prev.filter(todo => todo.id !== id);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newTodo">New Todo</label>
        <br />
        <input type="text"
               id='newTodo'
               value={newTodo}
               onChange={e => setNewTodo(e.target.value)}
               autoFocus />
        <br />
        <br />
        <button>Add</button>
      </form>
      <h1>Todo List</h1>
      <ul>
        {todos.length === 0 && <p>No todos</p>}
        {todos.map(todo => {
          return <li key={todo.id}>
                   <label htmlFor="checkbox">{todo.text}</label>
                   <input type="checkbox"
                          id='checkbox'
                          checked={todo.checked}
                          onChange={e => toggleTodo(todo.id, e.target.checked)} />
                   <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                 </li>
        })}
      </ul>
    </>
  );
};

export default App;
