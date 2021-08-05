import * as actions from './actionTypes'
import axios from 'axios'

let cid=10;

export const addTodo = (text) => ({
  type: actions.ADD_TODO,
  payload: {
    todo: { 
      id: cid++,
      text,
      isCompleted: false,
    },
  },
});

export const removeTodo = id => ({
  type: actions.REMOVE_TODO,
  payload: {
      id 
  }
});

export const toggleCompleteState = (id) => ({
  type: actions.TODO_TOGGLE_COMPLETE,
  payload: {
    id,
  },
});

export const addTodoAsync = (text) => {
  return (dispatch) =>
    setTimeout(() => {
      dispatch(addTodo(text));
    }, 2000);
};
export const loadTodos = () => {
  return (dispatch) =>
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((todos) => {
        console.log(todos.data);

        dispatch(getTodos(todos.data))
        // todos.data.forEach((todo) => {
        //   dispatch(getTodos(todo.title));
        // });
      })
      .catch((err) => console.log(err.message));
    
};
export const getTodos = (todos)=> ({
  type: actions.LOAD_TODOS,
  payload: {
    todos
  }
})