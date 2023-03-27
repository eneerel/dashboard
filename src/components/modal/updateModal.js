import { React, useState } from 'react';
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
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditCategory({ getCategory, id, open, handleClose, title, description, categoryImg, rating }) {
  const [changeTitle, setChangeTitle] = useState(title);

  const [changeDesc, setChangeDesc] = useState(description);

  const [changeImg, setChangeImg] = useState(categoryImg);

  const [changeRating, setChangeRating] = useState(rating);

    const updateCategory = async (id) => {
      console.log('NAME', title);
      try {
        const result = await axios.put(`http://localhost:8000/category/${id}`, {
          title: changeTitle,
          description: changeDesc,
          categoryRating: changeRating,
          categoryImg: changeImg,
        });
        getCategory();
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
            label="Title"
            defaultValue={title}
            onChange={(e) => {
              console.log("TEST",e.target.value)
              setChangeTitle(e.target.value);
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Decription"
            defaultValue={description}
            onChange={(e) => {
              setChangeDesc(e.target.value);
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Image"
            defaultValue={categoryImg}
            onChange={(e) => {
              setChangeImg(e.target.value);
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Rating"
            defaultValue={rating}
            onChange={(e) => {
              setChangeRating(e.target.value);
            }}
          />
          <Button
            variant="=contained"
            color="primary"
            onClick={() => {
              updateCategory(id);
            }}
          >
            Done
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
