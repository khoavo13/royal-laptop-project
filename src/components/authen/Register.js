import { Box, Container, Button, Typography, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: "100px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Đăng Ký
        </Typography>
        <Box
          component="form"
          sx={{ mt: 1 }}
          onSubmit={(e) => {
            e.preventDefault();
            // Handle registration here
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Họ và Tên"
            name="name"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Mật Khẩu"
            type="password"
            name="password"
            autoComplete="new-password"
            sx={{ mb: 2 }}
          />
          <Link to="/" sx={{ textDecoration: "none", color: "inherit" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, py: 1.5 }}
            >
              Đăng Ký
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
