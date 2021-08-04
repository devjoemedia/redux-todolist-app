import { useEffect, useState } from 'react';
import './App.css';
import './Checkbox.css'
import store from './redux-store/store';
import {addTodo, removeTodo} from './redux-store/actions';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function App() {
  const [todoText, setTodoText] = useState('')
  const [todos, setTodos] = useState([])

  store.subscribe((e) => {
      let {todos} = store.getState();
      setTodos(todos);
  });
  
  useEffect(()=>{
    let data = store.getState();
    setTodos(data.todos);
  },[])

  const handleRemove = (id) =>{
    store.dispatch(removeTodo(id))
  }

  const handleSubmit = ()=> {
    if (todoText) {
      store.dispatch(addTodo(todoText));
      
    }else {
      alert("Please Enter text")
    }
    setTodoText('')
  }

  // allows item to stay at drop position
  const handleOnDragEnd =(result)=> {
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    if (!result.destination) return;
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  }

  return (
    <div className="app">
      <h1 className="app__title">Todo List</h1>
      <div className="app__form">
        <input
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          className="input"
          type="text"
          placeholder="Enter todo"
        />
        <button className="add" onClick={handleSubmit}>
          Add Todo
        </button>
      </div>
      <div className="app__todos">
        <h2 className="app__title">Todos</h2>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="items">
            {(provided) => (
              <ul
                className="items"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todos ? (
                  todos.map((todo, index) => (
                    <Draggable
                      key={index}
                      draggableId={`item-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={"app__todo"}
                        >
                          <p>
                            <input type="checkbox" id={`item-${todo.id}`} />
                            <label for={`item-${todo.id}`}>{todo.text}</label>
                          </p>

                          <button
                            className="remove"
                            onClick={() => handleRemove(todo.id)}
                          >
                            X
                          </button>
                        </li>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <h1>"No item found!"</h1>
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
