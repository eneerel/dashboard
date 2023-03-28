import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Card, Link, Typography, Button, Stack, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

export default function ShopProductCard({ travel }) {
  const { title, detail, travelImg, price, travelDay, travelLocation, category } = travel;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={title} src={travelImg} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="subtitle2" noWrap>
          {detail}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">{fCurrency(price)}</Typography>
        </Stack>
        <TableRow>
          <Button size="large" color="inherit">
            <DeleteForeverIcon />
          </Button>
          <Button size="large" color="inherit">
            <EditIcon />
            Edit
          </Button>
        </TableRow>
      </Stack>
    </Card>
  );
}
