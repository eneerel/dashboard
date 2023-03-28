import { React, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Modal, TextField, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function AddCategory({ open, handleAddClose, render, setRender }) {
  const AddTravel = async () => {
    try {
      await axios.post('http://localhost:8000/travel', {});
    } catch (err) {
      console.log('err', err);
    }
    setRender();
    handleAddClose();
  };

  return (
    <div>
      <Modal keepMounted open={open} onClose={handleAddClose}>
        <Box component="form" sx={style}>
          <Typography>Add new category</Typography>
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Title"
            onChange={(e) => {
              setChangeTitle(e.target.value);
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Description"
            onChange={(e) => {
              setChangeDesc(e.target.value);
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Image"
            onChange={(e) => {
              setChangeCategoryImg(e.target.value);
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Rating"
            onChange={(e) => {
              setChangeCategoryRating(e.target.value);
            }}
          />
          <Button variant="contained" color="primary" onClick={AddCategory}>
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
