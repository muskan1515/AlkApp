import { createSlice } from '@reduxjs/toolkit';
import { UseSelector ,useDispatch} from 'react-redux';
import { setContentData } from './ContentSlice';

const slideSlice = createSlice({
  name: 'SlideData',
  initialState: {
    data: []
  },
  reducers: {
    setSlideData: (state, action) => {
      const {payload} = action;
      if(!payload.payload.index){
        const data=payload.payload;
        state.data=data;
      }
      else{
        const data=payload.payload.data;
        const index=payload.payload.index;
        state.data[index-1]=data;
      }
    }
  }
});

export const { setSlideData } = slideSlice.actions;
export default slideSlice.reducer;

