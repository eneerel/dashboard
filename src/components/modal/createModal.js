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
  const [title, setChangeTitle] = useState();

  const [description, setChangeDesc] = useState();

  const [categoryImg, setChangeCategoryImg] = useState();

  const [categoryRating, setChangeCategoryRating] = useState();

  const AddCategory = async () => {
    try {
      await axios.post('http://localhost:8000/category', {
        title,
        description,
        categoryImg,
        categoryRating,
      });
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
              variant="outlined"
              type="file"
              name="categoryImg"
              onChange={async (e) => {
                console.log(e.target.files[0]);
                const imgData = new FormData();
                imgData.append('image', e.target.files[0]);
                const res = await axios.post('http://localhost:8000/upload', imgData);
                console.log(res.data.imgUrl);
                setNewCategoryObj({ ...newCategoryObj, categoryImg: res.data.imgUrl });
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
