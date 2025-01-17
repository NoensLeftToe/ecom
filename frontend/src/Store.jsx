import { createStore, combineReducers, applyMiddleware } from "redux";
import { default as thunk } from 'redux-thunk';  // Named import workaround
 // Correct import for redux-thunk
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer } from './reducers/productReducer';  // Correct named import

const reducer = combineReducers({
    products: productReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
