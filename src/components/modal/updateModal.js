import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditCategory({ render, setRender, category, setCategory, open, handleClose }) {
  const updateCategory = async () => {
    try {
      const result = await axios.put(`http://localhost:8000/category/${category._id}`, category);
      // getCategory();
      setRender(!render);
      handleClose();
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <div>
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Нэр"
            name="title"
            value={category.title}
            onChange={(e) => {
              console.log('TEST', e.target.name);
              console.log('TEST', e.target.value);
              setCategory({ ...category, [e.target.name]: e.target.value });
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="decription"
            name="description"
            value={category.description}
            onChange={(e) => {
              setCategory({ ...category, [e.target.name]: e.target.value });
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="categeryImg"
            name="categoryImg"
            value={category.categoryImg}
            onChange={(e) => {
              setCategory({ ...category, [e.target.name]: e.target.value });
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Үнэлгээ"
            name="categoryRating"
            value={category.categoryRating}
            onChange={(e) => {
              setCategory({ ...category, [e.target.name]: e.target.value });
            }}
          />
          <Button
            variant="=contained"
            color="primary"
            onClick={() => {
              updateCategory();
            }}
          >
            Done
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
