import * as actions from '../actions/actionTypes'

export const initialState = {
  todos: [
    { id: 1,text: "Check Emails", isComplete: false },
    { id: 2,text: "Walk Dogs", isComplete: false },
    { id: 3,text: "Pair Coding Challenge", isComplete: false },
    { id: 4,text: "Read Nodejs Ebooks", isComplete: false },
    { id: 5,text: "Do some Debuging", isComplete: false },
    { id: 6,text: "Meet ups", isComplete: false },
  ],
};

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_TODO:
            return {
              ...state,
              todos: [...state.todos, action.payload.todo],
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