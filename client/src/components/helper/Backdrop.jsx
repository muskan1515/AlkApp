import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import GenerateImageBox from './GenerateImageBox';

const BackdropBox=({change,removeBackdrop,setBackdropVisibility})=> {
  const [open, setOpen] = React.useState(change?change:false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <GenerateImageBox setBackdropVisibility={setBackdropVisibility}/>
      </Backdrop>
    </div>
  );
}
export default BackdropBox;