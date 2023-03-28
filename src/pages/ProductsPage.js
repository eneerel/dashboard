import { Helmet } from 'react-helmet-async';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// @mui
import { Container, Stack, Typography, Button } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';

// mock
// import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [render, setRender] = useState(false);

  const [travels, setTravels] = useState([]);

  const [filteredTravel, setFilteredTravel] = useState([]);

  const getTravel = () => {
    axios
      .get('http://localhost:8000/travel')
      .then((res) => {
        console.log('irsen travel', res.data);
        setTravels(res.data.Travels);
        setFilteredTravel(res.data.Travels);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };

  useEffect(() => {
    getTravel();
  }, [render]);
  return (
    <>
      <Helmet>
        <title> Dashboard: Travel | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Travels
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => {
                console.log('first');
              }}
            >
              Шинэ Аялал Үүсгэх
            </Button>
          </Stack>
        </Stack>

        <ProductList filteredTravel={filteredTravel} />
      </Container>
    </>
  );
}
