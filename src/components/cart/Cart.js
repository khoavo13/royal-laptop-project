// src/components/CartPage.js
import React, { useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  IconButton,
  TextField,
  Paper as MuiPaper,
  Checkbox,
  Box,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import {
  getCheckAll,
  removeCheckedAll,
  removeItemCart,
  updateCheckedItem,
  updateQuantity,
} from "../../redux/cartSlide";
import { DeleteOutline } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { carts, checkAll } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, count) => {
    dispatch(updateQuantity({ id, count }));
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const subtotal = carts.reduce(
    (curr, item) => curr + item.quantity * item.price,
    0
  );
  const tempSubtotal = carts.reduce(
    (curr, item) => (item.checked ? curr + item.quantity * item.price : curr),
    0
  );
  const discount = 20;

  const handleDeleteItem = (cartItem) => {
    Swal.fire({
      title: `Bạn muốn xóa ${cartItem.name}?`,
      showDenyButton: true,
      denyButtonText: "Delete",
      showCancelButton: true,
      showConfirmButton: false,
      icon: "error",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        dispatch(removeItemCart(cartItem));
        Swal.fire("Đã xóa!", "", "success");
      }
    });
  };

  const handleCheckItem = (id) => {
    dispatch(updateCheckedItem(id));
  };

  const handleDeleteAllSelected = () => {
    Swal.fire({
      title: `Bạn có muốn xóa tất cả sản phẩm đã chọn?`,
      showDenyButton: true,
      denyButtonText: "Delete",
      showCancelButton: true,
      showConfirmButton: false,
      icon: "error",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        dispatch(removeCheckedAll());
        Swal.fire("Đã xóa!", "", "success");
      }
    });
  };

  const getDetailProduct = (id)=>{
    navigate(`/product/${id}`)
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: "100px", minHeight: "100vh", marginBottom: '10px'}}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={8}>
          <Paper style={{ padding: "20px", background: "#ecf0f1" }}>
            <Typography variant="h6" gutterBottom>
              Danh sách giỏ hàng
            </Typography>
            <TableContainer component={MuiPaper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Checkbox
                            checked={checkAll}
                            onChange={() => dispatch(getCheckAll())}
                          /></TableCell>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Đơn giá</TableCell>
                    <TableCell>Tổng cộng</TableCell>
                    <TableCell>Xóa</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {carts &&
                    carts.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox
                            checked={item.checked}
                            onChange={() => handleCheckItem(item.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                            onClick={()=>getDetailProduct(item.id)}
                          >
                            <img
                              src={require(`../../img/product/${item.image}.png`)}
                              alt={item.name}
                              style={{
                                width: "50px",
                                height: "50px",
                                marginRight: "10px",
                              }}
                            />
                            {item.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "5px",
                            }}
                          >
                            <IconButton
                              onClick={() => handleQuantityChange(item.id, -1)}
                              disabled={item.quantity <= 1}
                              sx={{
                                width: "30px",
                                height: "30px",
                                color: "#e74c3c",
                                border: "1px solid #000",
                              }}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <TextField
                              value={item.quantity || 0}
                              sx={{
                                width: "50px",
                                margin: "0 5px",
                                textAlign: "center",
                                "& input": {
                                  textAlign: "center",
                                  fontSize: "13px",
                                  fontWeight: "800",
                                },
                              }}
                              type="text"
                              disabled={true}
                            />
                            <IconButton
                              onClick={() => handleQuantityChange(item.id, 1)}
                              sx={{
                                width: "30px",
                                height: "30px",
                                color: "#2980b9",
                                border: "1px solid #000",
                              }}
                            >
                              <AddIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                        <TableCell>${item.price.toLocaleString()}</TableCell>
                        <TableCell>
                          ${(item.quantity * item.price).toLocaleString()}
                        </TableCell>
                        <TableCell onClick={() => handleDeleteItem(item)}>
                          <DeleteOutline sx={{ color: "#e74c3c" }} />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      Tổng cộng:
                    </TableCell>
                    <TableCell>${subtotal.toLocaleString()}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              size="medium"
              color="error"
              disabled={false}
              style={{ marginTop: "20px" }}
              onClick={handleDeleteAllSelected}
            >
              Xóa sản phẩm đã chọn
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            style={{
              padding: "20px",
              marginBottom: "20px",
              background: "#ecf0f1",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Khuyến mãi
            </Typography>
            <div>
              <Typography variant="body1">Mã khuyến mãi: SAVE20</Typography>
            </div>
          </Paper>

          <Paper style={{ padding: "20px", background: "#ecf0f1", marginBottom:  "20px" }}>
            <Typography variant="h6" gutterBottom>
              Thanh toán
            </Typography>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography variant="body1" style={{ marginBottom: "8px" }}>
                Tổng tạm tính: ${tempSubtotal.toLocaleString()}
              </Typography>
              <Typography
                variant="body1"
                style={{ marginBottom: "8px", color: "#2980b9" }}
              >
                Khuyến mãi: ${discount.toLocaleString()}
              </Typography>
              <Typography
                variant="body1"
                style={{ fontWeight: "bold", marginBottom: "8px" }}
              >
                Tổng giá: $
                {(tempSubtotal - discount <= 0
                  ? 0
                  : tempSubtotal - discount
                ).toLocaleString()}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              disabled={tempSubtotal - discount <= 0}
              onClick={() => navigate("/order")}
            >
              Tiếp tục
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
