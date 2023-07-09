import {configureStore} from '@reduxjs/toolkit' 

import SlideReducer from './reducers/slideSlice';

const store=configureStore({
    reducer:SlideReducer
});

export default store;