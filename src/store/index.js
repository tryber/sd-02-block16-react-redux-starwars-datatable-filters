import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
