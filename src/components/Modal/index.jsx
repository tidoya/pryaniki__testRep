import { Box, Modal, Typography } from '@mui/material';
import React from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
};
const ModalWindow = (open) => {
  return (
    <Modal
      keepMounted
      open={open}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description">
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          Произошла ошибка.
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          Произошла ошибка. С синхронизацией с базой данных, пожалуйста перезагрузите страницу
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
