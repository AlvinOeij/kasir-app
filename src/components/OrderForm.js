import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Box,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const OrderForm = ({ cart = [], onUpdateQuantity, onRemoveItem, onSaveOrder, customerName, onCustomerNameChange }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Detail Pesanan
      </Typography>

      <TextField
        fullWidth
        label="Nama Customer"
        value={customerName}
        onChange={(e) => onCustomerNameChange(e.target.value)}
        margin="normal"
      />

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                fontSize: '1.1rem', 
                fontWeight: 600,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText'
              }}>
                Produk
              </TableCell>
              <TableCell align="right" sx={{ 
                fontSize: '1.1rem', 
                fontWeight: 600,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText'
              }}>
                Harga
              </TableCell>
              <TableCell align="right" sx={{ 
                fontSize: '1.1rem', 
                fontWeight: 600,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText'
              }}>
                Jumlah
              </TableCell>
              <TableCell align="right" sx={{ 
                fontSize: '1.1rem', 
                fontWeight: 600,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText'
              }}>
                Subtotal
              </TableCell>
              <TableCell align="right" sx={{ 
                fontSize: '1.1rem', 
                fontWeight: 600,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText'
              }}>
                Aksi
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">
                  Rp {item.price.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
                    inputProps={{ min: 1 }}
                    size="small"
                    sx={{ width: 60 }}
                  />
                </TableCell>
                <TableCell align="right">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    onClick={() => onRemoveItem(item.id)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          Total: Rp {total.toLocaleString()}
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={onSaveOrder}
          disabled={cart.length === 0 || !customerName}
        >
          Simpan Pesanan
        </Button>
      </Box>
    </Paper>
  );
};

export default OrderForm; 