import { createSlice } from '@reduxjs/toolkit';

const slideSlice = createSlice({
  name: 'ContentData',
  initialState: {
    data: []
  },
  reducers: {
    setContentData: (state, action) => {
        
    //   const {payload} = action;
    //   if(!payload.payload.index){
    //     const data=payload.payload;
    //     state.data=data;
        
    //   }
    //   else{
    //     const data=payload.payload.data;
    //     const index=payload.payload.index;
    //     state.data[index-1]=data;
    //   }
    }
  }
});

export const { setContentData } = slideSlice.actions;
export default slideSlice.reducer;