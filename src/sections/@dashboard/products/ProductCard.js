import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Button, Container, Popover, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

// components
import TravelModal from '../../../components/modal/travelModal';
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import Iconify from '../../../components/iconify/Iconify';
import { CategoryContext } from '../../../context/catContext';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product, modalOpen, setModalOpen, isNew, setIsNew, handleClose }) {
  const { setRender, render, setTravel } = useContext(CategoryContext);
  const [anchorEl, setAnchorEl] = useState(null);
  //--------------------------------------------------------------------
  const { _id, price, location, images, title, day, detail } = product;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const deleteTravel = async (_id) => {
    try {
      const result = await axios.delete(`http://localhost:8000/travel/${_id}`);
      console.log(result.data.travel);
      setRender(!render);
    } catch (err) {
      console.log('ERR', err);
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  //--------------------------------------------------------------------

  return (
    <Box>
      <TravelModal modalOpen={modalOpen} handleClose={handleClose} isNew={isNew} />
      <Container>
        <Card>
          <Box sx={{ pt: '100%', position: 'relative' }}>
            {price && (
              <Label
                variant="filled"
                color={(price === 'sale' && 'error') || 'info'}
                sx={{
                  zIndex: 9,
                  top: 16,
                  right: 16,
                  position: 'absolute',
                  textTransform: 'uppercase',
                }}
              >
                {price}
              </Label>
            )}
            <StyledProductImg alt={title} src={images} />
          </Box>

          <Stack spacing={2} sx={{ p: 3 }}>
            <Link color="inherit" underline="hover">
              <Typography variant="subtitle1" alignItems="center" noWrap>
                {title}
              </Typography>
            </Link>

            <Typography>{detail}</Typography>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography>location: {location}</Typography>
              <Typography>days:{day}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through',
                  }}
                >
                  {price}
                </Typography>
              </Typography>

              <IconButton aria-describedby={id} variant="contained" size="large" color="inherit" onClick={handleClick}>
                <Iconify icon={'eva:more-vertical-fill'} />
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose1}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Button
                  onClick={() => {
                    setModalOpen(true);
                    setTravel(product);
                    setIsNew(true);
                  }}
                >
                  <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                </Button>
                <Button sx={{ color: 'error.main' }} onClick={() => deleteTravel(_id)}>
                  <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                </Button>
              </Popover>
            </Stack>
            {/* <Button>view category</Button> */}
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}