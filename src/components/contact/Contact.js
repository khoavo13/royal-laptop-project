import {
  Container,
  Button,
  Box,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
        marginBottom: "40px",
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          marginBottom: 4,
          textAlign: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Liên Hệ Chúng Tôi
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              "& .MuiTextField-root": {
                marginBottom: 2,
              },
              "& .MuiButton-root": {
                marginTop: 2,
                paddingY: 1.5,
              },
            }}
            onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Gửi Thông Điệp
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Họ và Tên"
              name="name"
              autoComplete="name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Số Điện Thoại"
              name="phone"
              autoComplete="tel"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Tin Nhắn"
              name="message"
              multiline
              rows={4}
            />
            <Link to="/" sx={{ textDecoration: "none", color: "inherit" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Gửi
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              height: "100%",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Thông Tin Liên Hệ
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Địa Chỉ:</strong> 123 Đường Phố, Thành Phố, Quốc Gia
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Số Điện Thoại:</strong> +84 123 456 789
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> contact@example.com
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
