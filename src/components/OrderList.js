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
  Box,
  Collapse,
  IconButton,
  Button,
  Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

const Row = ({ order, onDelete, onEdit, onToggleStatus }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ 
        '& > *': { borderBottom: 'unset' },
        backgroundColor: order.isDone ? 'success.lighter' : 'error.lighter',
        transition: 'background-color 0.3s ease',
      }}>
        <TableCell>
          <Button
            variant={open ? "contained" : "outlined"}
            size="small"
            onClick={() => setOpen(!open)}
            sx={{
              minWidth: '80px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
              borderColor: open ? 'primary.main' : 'text.secondary',
              color: open ? 'primary.contrastText' : 'text.secondary',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: open ? 'primary.dark' : 'primary.lighter',
                color: open ? 'primary.contrastText' : 'primary.main',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                '&::after': {
                  transform: 'scaleX(1)',
                },
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '2px',
                backgroundColor: 'primary.main',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.3s ease-in-out',
              },
              fontWeight: 500,
              letterSpacing: '0.5px',
              textTransform: 'none',
              borderRadius: '8px',
              px: 2,
              py: 0.75,
            }}
          >
            Detail
          </Button>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {order.customerName}
          </Typography>
        </TableCell>
        <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
        <TableCell align="right">Rp {order.total.toLocaleString()}</TableCell>
        <TableCell>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button
              variant="contained"
              size="small"
              color={order.isDone ? "success" : "warning"}
              startIcon={order.isDone ? <CheckCircleIcon /> : <PendingIcon />}
              onClick={() => onToggleStatus(order)}
              sx={{
                minWidth: '100px',
                '&.MuiButton-containedSuccess': {
                  backgroundColor: 'success.main',
                  '&:hover': {
                    backgroundColor: 'success.dark',
                  }
                },
                '&.MuiButton-containedWarning': {
                  backgroundColor: 'warning.main',
                  '&:hover': {
                    backgroundColor: 'warning.dark',
                  }
                }
              }}
            >
              {order.isDone ? "Selesai" : "Pending"}
            </Button>
            <IconButton 
              color="info"
              size="small"
              onClick={() => onEdit(order)}
              sx={{
                backgroundColor: 'info.lighter',
                '&:hover': {
                  backgroundColor: 'info.light',
                }
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              color="error"
              size="small"
              onClick={() => onDelete(order)}
              sx={{
                backgroundColor: 'error.lighter',
                '&:hover': {
                  backgroundColor: 'error.light',
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ 
              margin: 1,
              backgroundColor: order.isDone ? 'success.lighter' : 'error.lighter',
              borderRadius: 2,
              p: 3,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                component="div"
                sx={{
                  color: 'primary.main',
                  borderBottom: '2px solid',
                  borderColor: 'primary.main',
                  pb: 1,
                  mb: 2
                }}
              >
                Detail Order
              </Typography>
              <Table size="small" sx={{
                '& .MuiTableCell-root': {
                  borderColor: 'rgba(0, 0, 0, 0.1)'
                }
              }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 600,
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      borderTopLeftRadius: '8px',
                    }}>
                      Produk
                    </TableCell>
                    <TableCell align="right" sx={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 600,
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                    }}>
                      Jumlah
                    </TableCell>
                    <TableCell align="right" sx={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 600,
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                    }}>
                      Harga
                    </TableCell>
                    <TableCell align="right" sx={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 600,
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      borderTopRightRadius: '8px',
                    }}>
                      Subtotal
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow 
                      key={item.id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? 'background.paper' : 'action.hover',
                        '&:hover': {
                          backgroundColor: 'action.selected'
                        }
                      }}
                    >
                      <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                        {item.name}
                      </TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">Rp {item.price.toLocaleString()}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        Rp {(item.price * item.quantity).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ 
                    backgroundColor: 'primary.lighter',
                    '& .MuiTableCell-root': {
                      borderBottom: 'none'
                    }
                  }}>
                    <TableCell colSpan={3} sx={{ fontWeight: 600 }}>
                      Total
                    </TableCell>
                    <TableCell align="right" sx={{ 
                      fontWeight: 600, 
                      color: 'primary.main',
                      fontSize: '1.1rem'
                    }}>
                      Rp {order.total.toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const OrderList = ({ orders, onDelete, onEdit, onToggleStatus }) => {
  const totalIncome = orders
    .filter(order => order.isDone)
    .reduce((sum, order) => sum + order.total, 0);

  return (
    <Paper sx={{ p: 2, width: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h5">
          Riwayat Pesanan
        </Typography>
        <Box sx={{ 
          backgroundColor: 'success.lighter',
          p: 2,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'success.dark',
              fontWeight: 600 
            }}
          >
            Total Penghasilan: Rp {totalIncome.toLocaleString()}
          </Typography>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                fontSize: '1.1rem', 
                fontWeight: 600,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText'
              }}>
                Detail Order
              </TableCell>
              <TableCell sx={{ 
                fontSize: '1.1rem', 
                fontWeight: 600,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText'
              }}>
                Nama Customer
              </TableCell>
              <TableCell sx={{ 
                fontSize: '1.1rem', 
                fontWeight: 600,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText'
              }}>
                Tanggal
              </TableCell>
              <TableCell align="right" sx={{ 
                fontSize: '1.1rem', 
                fontWeight: 600,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText'
              }}>
                Total
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
            {orders.map((order, index) => (
              <Row 
                key={index} 
                order={order} 
                onDelete={onDelete}
                onEdit={onEdit}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OrderList;