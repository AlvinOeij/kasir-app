import React from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea, Box, Divider } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export const products = [
  // Makanan
  { id: 1, name: 'Telur Gulung', price: 1000, type: 'food' },
  { id: 2, name: 'Kentang Goreng Small', price: 5000, type: 'food' },
  { id: 3, name: 'Kentang Goreng Large', price: 10000, type: 'food' },
  { id: 4, name: 'Nugget', price: 10000, type: 'food' },
  { id: 5, name: 'Kaget', price: 15000, type: 'food' },
  { id: 6, name: 'Popcorn', price: 10000, type: 'food' },
  // Minuman
  { id: 7, name: 'Tea', price: 3000, type: 'drink' },
  { id: 8, name: 'Milk Tea', price: 5000, type: 'drink' },
  { id: 9, name: 'Teh Bunga', price: 6000, type: 'drink' },
];

const MenuSection = ({ title, items, onProductSelect }) => (
  <Box sx={{ 
    mb: { xs: 4, md: 2 }
  }}>
    <Typography 
      variant="h6" 
      gutterBottom
      sx={{ 
        color: 'text.primary',
        fontWeight: 600,
        mb: { xs: 2, md: 1 },
        textAlign: 'center',
        borderBottom: '2px solid',
        borderColor: 'primary.main',
        pb: 1,
        fontSize: {
          xs: '1.1rem',
          sm: '1.2rem',
          md: '1.2rem'
        }
      }}
    >
      {title}
    </Typography>
    <Grid container spacing={{ xs: 1, sm: 2, md: 1 }}>
      {items.map((product) => (
        <Grid 
          item 
          xs={4} // 3 kolom di mobile
          sm={4} // 3 kolom di tablet
          md={4} // 3 kolom di desktop
          key={product.id}
        >
          <Card 
            sx={{ 
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: {
                  xs: 'none', // Tidak ada efek hover di mobile
                  sm: 'translateY(-4px)' // Efek hover mulai dari tablet
                },
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              }
            }}
          >
            <CardActionArea
              onClick={() => onProductSelect(product)}
              sx={{
                width: '100%',
                height: '100%'
              }}
            >
              <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: { xs: 1, sm: 1.5, md: 2 }, // Padding yang responsif
                minHeight: { xs: '100px', sm: '120px', md: '120px' }, // Tinggi yang responsif
                width: '100%'
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontSize: {
                      xs: '0.9rem',
                      sm: '1rem',
                      md: '1.1rem'
                    },
                    fontWeight: 600,
                    color: '#fff',
                    textAlign: 'center',
                    width: '100%',
                    mb: { xs: 0.5, sm: 1, md: 1.5 },
                    lineHeight: 1.2
                  }}
                >
                  {product.name}
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    color: '#90caf9',
                    fontWeight: 700,
                    fontSize: {
                      xs: '0.8rem',
                      sm: '0.9rem',
                      md: '1.1rem'
                    },
                    mb: { xs: 0.5, sm: 1, md: 1.5 }
                  }}
                >
                  Rp {product.price.toLocaleString()}
                </Typography>
                <AddShoppingCartIcon 
                  className="cart-icon"
                  sx={{ 
                    fontSize: {
                      xs: '1rem',
                      sm: '1.2rem',
                      md: '1.3rem'
                    },
                    color: '#90caf9',
                    opacity: 0.9,
                    display: { xs: 'none', sm: 'block' } // Sembunyikan icon di mobile
                  }} 
                />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const ProductList = ({ onProductSelect }) => {
  const foods = products.filter(p => p.type === 'food');
  const drinks = products.filter(p => p.type === 'drink');

  return (
    <Box sx={{ 
      width: '100%',
      px: { xs: 1, sm: 2, md: 1 }
    }}>
      <MenuSection title="Makanan" items={foods} onProductSelect={onProductSelect} />
      <Divider sx={{ 
        my: { xs: 2, sm: 3, md: 1 }
      }} />
      <MenuSection title="Minuman" items={drinks} onProductSelect={onProductSelect} />
    </Box>
  );
}

export default ProductList;