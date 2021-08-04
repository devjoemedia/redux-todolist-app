import * as actions from './actionTypes'


export const addTodo = (text) => ({
  type: actions.ADD_TODO,
  payload: {
    todo: { 
      // id: 1,
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

export const addTodoAsync = (text) => {
  return (dispatch) =>
    setTimeout(() => {
      dispatch(addTodo(text));
    }, 2000);
};