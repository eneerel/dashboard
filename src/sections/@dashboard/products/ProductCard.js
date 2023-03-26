import PropTypes from 'prop-types';
import axios from 'axios';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
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

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
 
  // states

  // const [travles, setTravels] = useState([]);

  // const [fileteredTravels, setFilteredTravels] = useState([]);


  // const getTravel = async () => {
  //   try {
  //     const result = await axios.get('http://localhost:8000/travels');
  //     console.log('CAT IRLEE', result.data.travels);
  //     setTravels(result.data.travels);
  //     setFilteredTravels(result.data.travels);
  //   } catch (err) {
  //     console.log('Err', err);
  //   }
  // };

  // useEffect(() => {
  //   getTravel();
  // }, []);
  // const { title, travelImg, detail, price, location, day, category } = products;

  const { name, cover, price, colors, status, priceSale } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {detail && (
          <Label
            variant="filled"
            color={(detail === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {detail}
          </Label>
        )}
        <StyledProductImg alt={title} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {location}
          </Typography>
        </Link>
  
  
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
