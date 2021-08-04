import { createStore,applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import todosReducer from "./reducers/todosReducer";


const store = createStore(
  todosReducer,
  applyMiddleware(thunk),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;