import { Box, Container, Divider, Grid, List, ListItem, ListItemText, Paper, Typography, useTheme, Button } from '@mui/material';
import React from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';

export default function Warranty() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ mt: "100px", mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: theme.palette.primary.main }}>
          Chính sách bảo hành
        </Typography>

        <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary }}>
          Chúng tôi cam kết mang đến cho bạn chất lượng sản phẩm tốt nhất cùng với chính sách bảo hành uy tín. Dưới đây là chi tiết về các điều khoản và quy trình bảo hành.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2" gutterBottom sx={{ color: theme.palette.primary.dark }}>
              Điều kiện bảo hành
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Sản phẩm còn trong thời hạn bảo hành." sx={{ color: theme.palette.text.primary }} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Sản phẩm gặp sự cố do lỗi từ nhà sản xuất." sx={{ color: theme.palette.text.primary }} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Có đầy đủ phiếu bảo hành và hóa đơn mua hàng." sx={{ color: theme.palette.text.primary }} />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2" gutterBottom sx={{ color: theme.palette.primary.dark }}>
              Quy trình bảo hành
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Liên hệ trung tâm bảo hành qua số điện thoại hoặc email." sx={{ color: theme.palette.text.primary }} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Gửi sản phẩm về trung tâm bảo hành gần nhất." sx={{ color: theme.palette.text.primary }} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Nhận lại sản phẩm sau khi đã được sửa chữa hoặc thay thế." sx={{ color: theme.palette.text.primary }} />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Thông tin liên hệ */}
        <Box mt={4}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ color: theme.palette.primary.dark }}>
            Thông tin liên hệ
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary }}>
            Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo hành, vui lòng liên hệ với chúng tôi:
          </Typography>
          <List>
            <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              <ListItemText primary="Hotline: 1900-1234" sx={{ color: theme.palette.text.primary }} />
            </ListItem>
            <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              <ListItemText primary="Email: support@royallaptop.com" sx={{ color: theme.palette.text.primary }} />
            </ListItem>
            <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              <ListItemText primary="Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM" sx={{ color: theme.palette.text.primary }} />
            </ListItem>
          </List>
        </Box>

        <Box mt={4} textAlign="center">
        <Link
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
          <Button variant="contained" color="primary" size="large">
            Trở về trang chủ
          </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};
