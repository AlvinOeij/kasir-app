import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  ThemeProvider, 
  CssBaseline,
  IconButton,
  useMediaQuery,
  Alert,
  Snackbar,
  AppBar,
  Toolbar,
  Button,
  Paper
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ProductList from './components/ProductList';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import { products } from './components/ProductList';
import getTheme from './theme';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');
  const theme = React.useMemo(() => getTheme(mode), [mode]);
  
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState('kasir'); // 'kasir' atau 'riwayat'

  const toggleColorMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeItem = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleDeleteOrder = (orderToDelete) => {
    setOrders(orders.filter(order => order !== orderToDelete));
  };

  const handleEditOrder = (orderToEdit) => {
    // Mengatur ulang form kasir dengan data pesanan yang akan diedit
    setCart(orderToEdit.items);
    setCustomerName(orderToEdit.customerName);
    setCurrentPage('kasir');
    // Menghapus pesanan lama
    setOrders(orders.filter(order => order !== orderToEdit));
  };

  const handleToggleStatus = (orderToToggle) => {
    setOrders(orders.map(order => 
      order === orderToToggle 
        ? { ...order, isDone: !order.isDone }
        : order
    ));
  };

  const saveOrder = () => {
    const order = {
      customerName,
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toISOString(),
      isDone: false // Menambahkan status pesanan
    };
    
    setOrders([order, ...orders]);
    setCart([]);
    setCustomerName('');
    setShowSuccess(true);
  };

  const handleCustomerNameChange = (newName) => {
    setCustomerName(newName);
  };

  const renderContent = () => {
    if (currentPage === 'kasir') {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <OrderForm 
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              onSaveOrder={saveOrder}
              customerName={customerName}
              onCustomerNameChange={handleCustomerNameChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                color: 'text.primary',
                fontWeight: 500,
                mb: 3
              }}
            >
              Menu
            </Typography>
            <ProductList products={products} onProductSelect={addToCart} />
          </Grid>
        </Grid>
      );
    } else {
      return <OrderList 
        orders={orders}
        onDelete={handleDeleteOrder}
        onEdit={handleEditOrder}
        onToggleStatus={handleToggleStatus}
      />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistem Kasir
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => setCurrentPage('kasir')}
            sx={{ mx: 1 }}
          >
            Kasir
          </Button>
          <Button 
            color="inherit" 
            onClick={() => setCurrentPage('riwayat')}
            sx={{ mx: 1 }}
          >
            Riwayat Pesanan
          </Button>
          <IconButton onClick={toggleColorMode} color="inherit" size="small">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ 
        mt: { xs: 2, md: 1 },
        mb: { xs: 2, md: 1 },
      }}>
        <Box sx={{ 
          backgroundColor: 'background.default',
          minHeight: { 
            xs: 'calc(100vh - 64px)',
            md: 'calc(100vh - 48px)'
          },
          py: { xs: 3, md: 2 },
        }}>
          {renderContent()}
        </Box>

        <Snackbar 
          open={showSuccess} 
          autoHideDuration={3000} 
          onClose={() => setShowSuccess(false)}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Pesanan berhasil disimpan!
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;