import * as actions from '../actions/actionTypes'

export const initialState = {
  todos: [
    { id: 11,title: "Check Emails", completed: false },
    { id: 12,title: "Walk Dogs", completed: false },
    { id: 13,title: "Pair Coding Challenge", completed: false },
    { id: 14,title: "Read Nodejs Ebooks", completed: false },
    { id: 15,title: "Do some Debuging", completed: false },
    { id: 16,title: "Meet ups", completed: false },
  ],
};

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOAD_TODOS:
            return {
              ...state,
              todos: [...state.todos,...action.payload.todos]
            };
        case actions.ADD_TODO:
            return {
              ...state,
              todos: [...state.todos, action.payload.todo],
            };
        case actions.TODO_TOGGLE_COMPLETE:
          let data = state.todos.filter(todo => todo.id === action.payload.id)
          data = data[0];
          data.completed = !data.completed;
          let index = state.todos.findIndex(
            (todo) => todo.id === action.payload.id
          );
          state.todos.splice(index, 1, data);

          return {
              ...state,
              todos:[...state.todos] ,
            };
        case actions.REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.id)
            }
    
        default:
            return state;
    }
}

export default todosReducer;