import React from "react";
import { Container, Grid, Box, Typography, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import FacebookIcon from "@mui/icons-material/Facebook";
import { Instagram, Twitter, YouTube } from "@mui/icons-material";
import "./footer.css"; // Import the CSS file for styling

export default function Footer() {
  return (
    <footer className="footer">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box margin='10px 20px'>
              <Typography variant="h6" gutterBottom>
                Get in Touch
              </Typography>
              <Typography variant="body2" paragraph>
                Don’t miss any updates of our new hot deals!
              </Typography>
              <form action="/" method="post" noValidate>
                <TextField
                  fullWidth
                  type="email"
                  name="EMAIL"
                  placeholder="Email"
                  variant="outlined"
                  margin="normal"
                  size="small"
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Subscribe
                </Button>
              </form>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box margin='10px 20px'>
              <Typography variant="h6" gutterBottom>
                Dịch vụ
              </Typography>
              <ul className="list-unstyled f_list">
                <li><Link to="/">Điều khoản sử dụng</Link></li>
                <li><Link to="/">Chính sách bảo mật thông tin cá nhân</Link></li>
                <li><Link to="/">Chính sách bảo mật thanh toán</Link></li>
                <li><Link to="/">Giới thiệu Royal Laptop</Link></li>
                <li><Link to="/">Hệ thống cửa hàng</Link></li>
              </ul>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box margin='10px 20px'>
              <Typography variant="h6" gutterBottom>
                Hỗ trợ
              </Typography>
              <ul className="list-unstyled f_list">
                <li><Link to="/">Chính sách đổi - trả - hoàn tiền</Link></li>
                <li><Link to="/">Chính sách bảo hành - bồi hoàn</Link></li>
                <li><Link to="/">Chính sách vận chuyển</Link></li>
                <li><Link to="/">Chính sách khách sỉ</Link></li>
                <li><Link to="/">Phương thức thanh toán và xuất HĐ</Link></li>
              </ul>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box margin='10px 20px'>
              <Typography variant="h6" gutterBottom>
                Cộng đồng
              </Typography>
              <Box display="flex" justifyContent="flex-start">
                <Box mr={1}>
                  <Link to="/"><FacebookIcon style={{color: '#1877f2', fontSize: '50px'}}/></Link>
                </Box>
                <Box mr={1}>
                  <Link to="/"><YouTube style={{color: '#dd2c00', fontSize: '50px'}}/></Link>
                </Box>
                <Box mr={1}>
                  <Link to="/"><Instagram style={{color: '#e1306c', fontSize: '50px'}}/></Link>
                </Box>
                <Box>
                  <Link to="/"><Twitter style={{color: '#1DA1F2', fontSize: '50px'}}/></Link>
                </Box>
              </Box>
              <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                Thanh toán trực tuyến
              </Typography>
              <Box className="payment-images">
                <img src={require('../../img/payment-logo/apple-pay-og.png')} alt="Apple Pay"/>
                <img src={require('../../img/payment-logo/mpos-logo.png')} alt="MPOS"/>
                <img src={require('../../img/payment-logo/vnpay-logo.png')} alt="VNPay"/>
                <img src={require('../../img/payment-logo/zalopay-logo.png')} alt="ZaloPay"/>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={3}>
          <hr />
          <Typography variant="body2" color="textPrimary">
            © royallaptop Inc. 2024. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </footer>
  );
}